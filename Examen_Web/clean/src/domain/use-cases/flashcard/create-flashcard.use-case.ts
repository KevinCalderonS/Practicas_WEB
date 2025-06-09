import type { FlashcardEntity } from "../../entities/flashcard.entity"
import type { CreateFlashcardDto } from "../../dtos/flashcard/create-flashcard.dto"
import type { FlashcardRepository } from "../../repositories/flashcard.repository"
import type { CategoryRepository } from "../../repositories/category.repository"

interface CreateFlashcardUseCase {
  execute(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardEntity>
}

export class CreateFlashcard implements CreateFlashcardUseCase {
  constructor(
    private readonly flashcardRepository: FlashcardRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardEntity> {
    // Verify category exists and belongs to user
    const category = await this.categoryRepository.findById(createFlashcardDto.categoryId)
    if (category.userId !== createFlashcardDto.userId) {
      throw new Error("Category does not belong to user")
    }

    // Create flashcard
    const flashcard = await this.flashcardRepository.create(createFlashcardDto)

    // Update category flashcard count
    category.incrementFlashcardCount()
    await this.categoryRepository.updateById(category.id, category)

    return flashcard
  }
}
