export class CreateFlashcardDto {
  private constructor(
    public readonly question: string,
    public readonly answer: string,
    public readonly categoryId: string,
    public readonly userId: string,
    public readonly imageUrl?: string,
    public readonly difficulty?: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateFlashcardDto?] {
    const { question, answer, categoryId, userId, imageUrl, difficulty } = object

    if (!question) return ["Question is required"]
    if (!answer) return ["Answer is required"]
    if (!categoryId) return ["Category ID is required"]
    if (!userId) return ["User ID is required"]

    return [undefined, new CreateFlashcardDto(question, answer, categoryId, userId, imageUrl, difficulty)]
  }
}
