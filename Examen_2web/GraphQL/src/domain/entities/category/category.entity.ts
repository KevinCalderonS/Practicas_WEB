export class Category {
  id: number
  name: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial)
  }
}
