import { Injectable } from "@nestjs/common"
import { Product } from "../entities/product/product.entity"
import type { CreateProductDto } from "../dtos/product/create-product.dto"
import type { UpdateProductDto } from "../dtos/product/update-product.dto"

@Injectable()
export class ProductService {
  private products: Product[] = [
    new Product({
      id: 1,
      name: "Combo 1",
      description: "Hamburguesa con papas",
      price: 150,
      image: "combo1.jpg",
      categoryId: 1,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Product({
      id: 2,
      name: "Combo 2",
      description: "Tacos de carnitas",
      price: 100,
      image: "combo2.jpg",
      categoryId: 2,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Product({
      id: 3,
      name: "Combo 3",
      description: "Sopa de tortilla",
      price: 80,
      image: "combo3.jpg",
      categoryId: 3,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ]

  findAll(): Product[] {
    return this.products
  }

  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id)
  }

  findByCategory(categoryId: number): Product[] {
    return this.products.filter((product) => product.categoryId === categoryId)
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct = new Product({
      id: this.products.length + 1,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const productIndex = this.products.findIndex((product) => product.id === id)
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updateProductDto,
        updatedAt: new Date(),
      }
      return this.products[productIndex]
    }
    return undefined
  }

  remove(id: number): boolean {
    const productIndex = this.products.findIndex((product) => product.id === id)
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1)
      return true
    }
    return false
  }
}
