import { Injectable } from "@nestjs/common"
import { Category } from "../entities/category/category.entity"
import type { CreateCategoryDto } from "../dtos/category/create-category.dto"
import type { UpdateCategoryDto } from "../dtos/category/update-category.dto"

@Injectable()
export class CategoryService {
  private categories: Category[] = [
    new Category({
      id: 1,
      name: "Hamburguesas",
      description: "Deliciosas hamburguesas",
      image: "hamburguesas.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Category({
      id: 2,
      name: "Tacos",
      description: "Tacos tradicionales",
      image: "tacos.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Category({
      id: 3,
      name: "Sopas",
      description: "Sopas caseras",
      image: "sopas.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Category({
      id: 4,
      name: "Postres",
      description: "Deliciosos postres",
      image: "postres.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ]

  findAll(): Category[] {
    return this.categories
  }

  findOne(id: number): Category | null {
    const category = this.categories.find((category) => category.id === id)
    return category ?? null
  }

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory = new Category({
      id: this.categories.length + 1,
      ...createCategoryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    this.categories.push(newCategory)
    return newCategory
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Category | null {
    const categoryIndex = this.categories.findIndex((category) => category.id === id)
    if (categoryIndex !== -1) {
      this.categories[categoryIndex] = {
        ...this.categories[categoryIndex],
        ...updateCategoryDto,
        updatedAt: new Date(),
      }
      return this.categories[categoryIndex]
    }
    return null
  }

  remove(id: number): boolean {
    const categoryIndex = this.categories.findIndex((category) => category.id === id)
    if (categoryIndex !== -1) {
      this.categories.splice(categoryIndex, 1)
      return true
    }
    return false
  }
}
