import { Injectable } from "@nestjs/common"
import { Order } from "../entities/order/order.entity"
import { OrderItem } from "../entities/order-item/order-item.entity"
import type { CreateOrderDto } from "../dtos/order/create-order.dto"
import type { UpdateOrderDto } from "../dtos/order/update-order.dto"
import type { ProductService } from "./product.service"

@Injectable()
export class OrderService {
  private orders: Order[] = []
  private orderItems: OrderItem[] = []

  constructor(private productService: ProductService) {}

  findAll(): Order[] {
    return this.orders
  }

  findOne(id: number): Order {
    return this.orders.find((order) => order.id === id)
  }

  getOrderItems(orderId: number): OrderItem[] {
    return this.orderItems.filter((item) => item.orderId === orderId)
  }

  create(createOrderDto: CreateOrderDto): Order {
    let total = 0
    const orderId = this.orders.length + 1

    // Calcular total y crear items
    const items = createOrderDto.items.map((itemDto, index) => {
      const product = this.productService.findOne(itemDto.productId)
      const subtotal = product.price * itemDto.quantity
      total += subtotal

      const orderItem = new OrderItem({
        id: this.orderItems.length + index + 1,
        orderId,
        productId: itemDto.productId,
        quantity: itemDto.quantity,
        unitPrice: product.price,
        subtotal,
        notes: itemDto.notes,
      })

      this.orderItems.push(orderItem)
      return orderItem
    })

    const newOrder = new Order({
      id: orderId,
      customerName: createOrderDto.customerName,
      customerPhone: createOrderDto.customerPhone,
      total,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    this.orders.push(newOrder)
    return newOrder
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Order {
    const orderIndex = this.orders.findIndex((order) => order.id === id)
    if (orderIndex !== -1) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        ...updateOrderDto,
        updatedAt: new Date(),
      }
      return this.orders[orderIndex]
    }
    return null
  }

  remove(id: number): boolean {
    const orderIndex = this.orders.findIndex((order) => order.id === id)
    if (orderIndex !== -1) {
      // Eliminar también los items del pedido
      this.orderItems = this.orderItems.filter((item) => item.orderId !== id)
      this.orders.splice(orderIndex, 1)
      return true
    }
    return false
  }
}
