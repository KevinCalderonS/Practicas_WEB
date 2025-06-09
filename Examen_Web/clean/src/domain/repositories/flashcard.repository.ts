import type { FlashcardEntity } from "../entities/flashcard.entity"
import type { CreateFlashcardDto } from "../dtos/flashcard/create-flashcard.dto"
import type { UpdateFlashcardDto } from "../dtos/flashcard/update-flashcard.dto"

export abstract class FlashcardRepository {
  abstract create(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardEntity>
  abstract findAll(): Promise<FlashcardEntity[]>
  abstract findById(id: string): Promise<FlashcardEntity>
  abstract findByUserId(userId: string): Promise<FlashcardEntity[]>
  abstract findByCategoryId(categoryId: string): Promise<FlashcardEntity[]>
  abstract updateById(id: string, updateFlashcardDto: UpdateFlashcardDto): Promise<FlashcardEntity>
  abstract deleteById(id: string): Promise<FlashcardEntity>
  abstract searchByContent(query: string, userId: string): Promise<FlashcardEntity[]>
}
