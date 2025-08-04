export class Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryId: number
  available: boolean
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial)
  }
}
