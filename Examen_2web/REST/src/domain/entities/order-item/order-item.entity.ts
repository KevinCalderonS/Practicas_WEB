export class OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  subtotal: number
  notes?: string

  constructor(partial: Partial<OrderItem>) {
    Object.assign(this, partial)
  }
}
