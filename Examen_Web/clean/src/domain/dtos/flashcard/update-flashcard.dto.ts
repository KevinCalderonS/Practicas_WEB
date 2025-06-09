export class UpdateFlashcardDto {
  private constructor(
    public readonly question?: string,
    public readonly answer?: string,
    public readonly categoryId?: string,
    public readonly imageUrl?: string,
    public readonly difficulty?: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, UpdateFlashcardDto?] {
    const { question, answer, categoryId, imageUrl, difficulty } = object

    return [undefined, new UpdateFlashcardDto(question, answer, categoryId, imageUrl, difficulty)]
  }
}
