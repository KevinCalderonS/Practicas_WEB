export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public color: string,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string,
    public isPublic = false,
    public flashcardCount = 0,
  ) {}

  public static create(object: { [key: string]: any }): CategoryEntity {
    const { id, name, userId, color, description, isPublic, flashcardCount, createdAt, updatedAt } = object

    if (!id) throw new Error("Se requiere el ID de categoría")
    if (!name) throw new Error("El nombre de la categoría es obligatorio.")
    if (!userId) throw new Error("Se requiere identificación de usuario")
    if (!color) throw new Error("El color de la categoría es obligatorio.")

    return new CategoryEntity(
      id,
      name,
      userId,
      color,
      createdAt || new Date(),
      updatedAt || new Date(),
      description,
      isPublic || false,
      flashcardCount || 0,
    )
  }

  public incrementFlashcardCount(): void {
    this.flashcardCount++
    this.updatedAt = new Date()
  }

  public decrementFlashcardCount(): void {
    if (this.flashcardCount > 0) {
      this.flashcardCount--
      this.updatedAt = new Date()
    }
  }
}
