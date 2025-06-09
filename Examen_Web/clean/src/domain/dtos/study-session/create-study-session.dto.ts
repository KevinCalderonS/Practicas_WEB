import type { SessionType } from "../../entities/study-session.entity"

export class CreateStudySessionDto {
  private constructor(
    public readonly userId: string,
    public readonly totalCards: number,
    public readonly sessionType: SessionType,
    public readonly categoryId?: string,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateStudySessionDto?] {
    const { userId, totalCards, sessionType, categoryId } = object

    if (!userId) return ["User ID is required"]
    if (!totalCards || totalCards <= 0) return ["Total cards must be greater than 0"]
    if (!sessionType) return ["Session type is required"]

    return [undefined, new CreateStudySessionDto(userId, totalCards, sessionType, categoryId)]
  }
}
