export enum MasteryLevel {
  LEARNING = "learning",
  FAMILIAR = "familiar",
  PROFICIENT = "proficient",
  MASTERED = "mastered",
}

export class StudyProgressEntity {
  constructor(
    public id: string,
    public userId: string,
    public flashcardId: string,
    public masteryLevel: MasteryLevel,
    public nextReviewDate: Date,
    public lastCorrectAnswer?: Date,
    public consecutiveCorrect = 0,
    public totalAttempts = 0,
    public averageResponseTime = 0,
    public difficultyAdjustment = 0,
    public isMarkedForReview = false,
  ) {}

  public static create(object: { [key: string]: any }): StudyProgressEntity {
    const {
      id,
      userId,
      flashcardId,
      masteryLevel,
      nextReviewDate,
      lastCorrectAnswer,
      consecutiveCorrect,
      totalAttempts,
      averageResponseTime,
      difficultyAdjustment,
      isMarkedForReview,
    } = object

    if (!id) throw new Error("Study progress id is required")
    if (!userId) throw new Error("User id is required")
    if (!flashcardId) throw new Error("Flashcard id is required")

    return new StudyProgressEntity(
      id,
      userId,
      flashcardId,
      masteryLevel || MasteryLevel.LEARNING,
      nextReviewDate || new Date(),
      lastCorrectAnswer,
      consecutiveCorrect || 0,
      totalAttempts || 0,
      averageResponseTime || 0,
      difficultyAdjustment || 0,
      isMarkedForReview || false,
    )
  }

  public recordAttempt(isCorrect: boolean, responseTime: number): void {
    this.totalAttempts++

    // Update average response time
    const totalTime = this.averageResponseTime * (this.totalAttempts - 1) + responseTime
    this.averageResponseTime = totalTime / this.totalAttempts

    if (isCorrect) {
      this.consecutiveCorrect++
      this.lastCorrectAnswer = new Date()
      this.updateMasteryLevel()
    } else {
      this.consecutiveCorrect = 0
      this.isMarkedForReview = true
    }

    this.calculateNextReviewDate()
  }

  private updateMasteryLevel(): void {
    if (this.consecutiveCorrect >= 5) {
      this.masteryLevel = MasteryLevel.MASTERED
    } else if (this.consecutiveCorrect >= 3) {
      this.masteryLevel = MasteryLevel.PROFICIENT
    } else if (this.consecutiveCorrect >= 1) {
      this.masteryLevel = MasteryLevel.FAMILIAR
    }
  }

  private calculateNextReviewDate(): void {
    const now = new Date()
    let daysToAdd = 1

    switch (this.masteryLevel) {
      case MasteryLevel.LEARNING:
        daysToAdd = 1
        break
      case MasteryLevel.FAMILIAR:
        daysToAdd = 3
        break
      case MasteryLevel.PROFICIENT:
        daysToAdd = 7
        break
      case MasteryLevel.MASTERED:
        daysToAdd = 14
        break
    }

    this.nextReviewDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  }

  public getSuccessRate(): number {
    if (this.totalAttempts === 0) return 0
    return (this.consecutiveCorrect / this.totalAttempts) * 100
  }
}
