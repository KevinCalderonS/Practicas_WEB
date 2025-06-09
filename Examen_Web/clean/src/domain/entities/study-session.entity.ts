export enum SessionType {
  QUICK_REVIEW = "quick_review",
  DEEP_STUDY = "deep_study",
  SPACED_REPETITION = "spaced_repetition",
  CATEGORY_FOCUS = "category_focus",
}

export class StudySessionEntity {
  constructor(
    public id: string,
    public userId: string,
    public startTime: Date,
    public totalCards: number,
    public sessionType: SessionType,
    public categoryId?: string,
    public endTime?: Date,
    public completedCards = 0,
    public correctAnswers = 0,
    public incorrectAnswers = 0,
    public averageResponseTime = 0,
    public isCompleted = false,
  ) {}

  public static create(object: { [key: string]: any }): StudySessionEntity {
    const {
      id,
      userId,
      startTime,
      totalCards,
      sessionType,
      categoryId,
      endTime,
      completedCards,
      correctAnswers,
      incorrectAnswers,
      averageResponseTime,
      isCompleted,
    } = object

    if (!id) throw new Error("Study session id is required")
    if (!userId) throw new Error("User id is required")
    if (!totalCards) throw new Error("Total cards is required")
    if (!sessionType) throw new Error("Session type is required")

    return new StudySessionEntity(
      id,
      userId,
      startTime || new Date(),
      totalCards,
      sessionType,
      categoryId,
      endTime,
      completedCards || 0,
      correctAnswers || 0,
      incorrectAnswers || 0,
      averageResponseTime || 0,
      isCompleted || false,
    )
  }

  public recordAnswer(isCorrect: boolean, responseTime: number): void {
    this.completedCards++

    if (isCorrect) {
      this.correctAnswers++
    } else {
      this.incorrectAnswers++
    }

    // Update average response time
    const totalTime = this.averageResponseTime * (this.completedCards - 1) + responseTime
    this.averageResponseTime = totalTime / this.completedCards
  }

  public completeSession(): void {
    this.endTime = new Date()
    this.isCompleted = true
  }

  public getAccuracyRate(): number {
    if (this.completedCards === 0) return 0
    return (this.correctAnswers / this.completedCards) * 100
  }

  public getDuration(): number {
    if (!this.endTime) return 0
    return this.endTime.getTime() - this.startTime.getTime()
  }
}
