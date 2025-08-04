export class Order {
  id: number
  customerName: string
  customerPhone?: string
  total: number
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial)
  }
}
