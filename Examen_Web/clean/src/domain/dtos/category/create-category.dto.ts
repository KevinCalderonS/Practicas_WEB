export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly color: string,
    public readonly description?: string,
    public readonly isPublic?: boolean,
  ) {}

  public static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, userId, color, description, isPublic } = object

    if (!name) return ["Category name is required"]
    if (!userId) return ["User ID is required"]
    if (!color) return ["Category color is required"]

    return [undefined, new CreateCategoryDto(name, userId, color, description, isPublic)]
  }
}
