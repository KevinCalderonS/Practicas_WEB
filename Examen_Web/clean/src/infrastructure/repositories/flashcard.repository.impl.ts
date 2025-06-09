import type { FlashcardRepository } from "../../domain/repositories/flashcard.repository"
import type { FlashcardEntity } from "../../domain/entities/flashcard.entity"
import type { CreateFlashcardDto } from "../../domain/dtos/flashcard/create-flashcard.dto"
import type { UpdateFlashcardDto } from "../../domain/dtos/flashcard/update-flashcard.dto"
import type { FlashcardDatasource } from "../datasource/memory/flashcard.datasource"

export class FlashcardRepositoryImpl implements FlashcardRepository {
  constructor(private readonly datasource: FlashcardDatasource) {}

  async create(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardEntity> {
    const flashcard = await this.datasource.create({
      question: createFlashcardDto.question,
      answer: createFlashcardDto.answer,
      categoryId: createFlashcardDto.categoryId,
      userId: createFlashcardDto.userId,
      imageUrl: createFlashcardDto.imageUrl,
      difficulty: (createFlashcardDto.difficulty as any) || "medium",
      studyCount: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      updateStudyStats: function (isCorrect: boolean) {},
      getAccuracyRate: function () { return 0; },
    })
    return flashcard
  }

  async findAll(): Promise<FlashcardEntity[]> {
    return this.datasource.getAll()
  }

  async findById(id: string): Promise<FlashcardEntity> {
    const flashcard = await this.datasource.getById(id)
    if (!flashcard) throw new Error(`Flashcard with id ${id} not found`)
    return flashcard
  }

  async findByUserId(userId: string): Promise<FlashcardEntity[]> {
    return this.datasource.getByUserId(userId)
  }

  async findByCategoryId(categoryId: string): Promise<FlashcardEntity[]> {
    return this.datasource.getByCategoryId(categoryId)
  }

  async updateById(id: string, updateFlashcardDto: UpdateFlashcardDto): Promise<FlashcardEntity> {
    const updatedFlashcard = await this.datasource.update(id, {
      question: updateFlashcardDto.question,
      answer: updateFlashcardDto.answer,
      categoryId: updateFlashcardDto.categoryId,
      imageUrl: updateFlashcardDto.imageUrl,
      difficulty: updateFlashcardDto.difficulty as any,
    })

    if (!updatedFlashcard) throw new Error(`Flashcard with id ${id} not found`)
    return updatedFlashcard
  }

  async deleteById(id: string): Promise<FlashcardEntity> {
    const deletedFlashcard = await this.datasource.delete(id)
    if (!deletedFlashcard) throw new Error(`Flashcard with id ${id} not found`)
    return deletedFlashcard
  }

  async searchByContent(query: string, userId: string): Promise<FlashcardEntity[]> {
    return this.datasource.searchByContent(query, userId)
  }
}
