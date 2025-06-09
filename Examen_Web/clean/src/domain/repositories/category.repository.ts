import type { CategoryEntity } from "../entities/category.entity"
import type { CreateCategoryDto } from "../dtos/category/create-category.dto"

export abstract class CategoryRepository {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>
  abstract findAll(): Promise<CategoryEntity[]>
  abstract findById(id: string): Promise<CategoryEntity>
  abstract findByUserId(userId: string): Promise<CategoryEntity[]>
  abstract findPublicCategories(): Promise<CategoryEntity[]>
  abstract updateById(id: string, updateData: Partial<CategoryEntity>): Promise<CategoryEntity>
  abstract deleteById(id: string): Promise<CategoryEntity>
}
