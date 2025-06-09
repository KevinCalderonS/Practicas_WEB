export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export class FlashcardEntity {
  constructor(
    public id: string,
    public question: string,
    public answer: string,
    public categoryId: string,
    public userId: string,
    public difficulty: DifficultyLevel,
    public createdAt: Date,
    public updatedAt: Date,
    public imageUrl?: string,
    public lastStudied?: Date,
    public studyCount = 0,
    public correctAnswers = 0,
    public incorrectAnswers = 0,
  ) {}

  public static create(object: { [key: string]: any }): FlashcardEntity {
    const {
      id,
      question,
      answer,
      categoryId,
      userId,
      difficulty,
      imageUrl,
      createdAt,
      updatedAt,
      lastStudied,
      studyCount,
      correctAnswers,
      incorrectAnswers,
    } = object

    if (!id) throw new Error("Flashcard id is required")
    if (!question) throw new Error("Flashcard question is required")
    if (!answer) throw new Error("Flashcard answer is required")
    if (!categoryId) throw new Error("Category id is required")
    if (!userId) throw new Error("User id is required")

    return new FlashcardEntity(
      id,
      question,
      answer,
      categoryId,
      userId,
      difficulty || DifficultyLevel.MEDIUM,
      createdAt || new Date(),
      updatedAt || new Date(),
      imageUrl,
      lastStudied,
      studyCount || 0,
      correctAnswers || 0,
      incorrectAnswers || 0,
    )
  }

  public updateStudyStats(isCorrect: boolean): void {
    this.studyCount++
    this.lastStudied = new Date()
    this.updatedAt = new Date()

    if (isCorrect) {
      this.correctAnswers++
    } else {
      this.incorrectAnswers++
    }
  }

  public getAccuracyRate(): number {
    if (this.studyCount === 0) return 0
    return (this.correctAnswers / this.studyCount) * 100
  }
}
