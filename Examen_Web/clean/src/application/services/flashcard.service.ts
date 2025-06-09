import type { FlashcardEntity } from "../../domain/entities/flashcard.entity"
import type { FlashcardRepository } from "../../domain/repositories/flashcard.repository"
import type { CreateFlashcardDto } from "../../domain/dtos/flashcard/create-flashcard.dto"
import type { UpdateFlashcardDto } from "../../domain/dtos/flashcard/update-flashcard.dto"

export class FlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async getAllFlashcards(): Promise<FlashcardEntity[]> {
    return this.flashcardRepository.findAll()
  }

  async getFlashcardById(id: string): Promise<FlashcardEntity> {
    return this.flashcardRepository.findById(id)
  }

  async createFlashcard(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardEntity> {
    // Aquí podríamos añadir validaciones adicionales o lógica de negocio
    return this.flashcardRepository.create(createFlashcardDto)
  }

  async updateFlashcard(id: string, updateFlashcardDto: UpdateFlashcardDto): Promise<FlashcardEntity> {
    // Verificar que la flashcard existe antes de actualizarla
    await this.flashcardRepository.findById(id)
    return this.flashcardRepository.updateById(id, updateFlashcardDto)
  }

  async deleteFlashcard(id: string): Promise<FlashcardEntity> {
    // Verificar que la flashcard existe antes de eliminarla
    await this.flashcardRepository.findById(id)
    return this.flashcardRepository.deleteById(id)
  }

  async getFlashcardsByUserId(userId: string): Promise<FlashcardEntity[]> {
    return this.flashcardRepository.findByUserId(userId)
  }

  async getFlashcardsByCategoryId(categoryId: string): Promise<FlashcardEntity[]> {
    return this.flashcardRepository.findByCategoryId(categoryId)
  }

  async searchFlashcards(query: string, userId: string): Promise<FlashcardEntity[]> {
    return this.flashcardRepository.searchByContent(query, userId)
  }
}
