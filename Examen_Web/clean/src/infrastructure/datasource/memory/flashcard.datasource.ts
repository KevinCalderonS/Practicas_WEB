import { type FlashcardEntity, DifficultyLevel } from "../../../domain/entities/flashcard.entity"
import { v4 as uuidv4 } from "uuid"

// Datos iniciales en memoria
const initialFlashcards: FlashcardEntity[] = [
  {
    id: "1",
    question: "A rule that limits something",
    answer: "restriction",
    categoryId: "1",
    userId: "1",
    difficulty: DifficultyLevel.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c",
    studyCount: 5,
    correctAnswers: 3,
    incorrectAnswers: 2,
    updateStudyStats(isCorrect: boolean) {
      this.studyCount++;
      if (isCorrect) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
    },
    getAccuracyRate() {
      if (this.studyCount === 0) return 0;
      return this.correctAnswers / this.studyCount;
    },
  },
  {
    id: "2",
    question: "Forecast of a future event",
    answer: "prediction",
    categoryId: "1",
    userId: "1",
    difficulty: DifficultyLevel.EASY,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f",
    studyCount: 3,
    correctAnswers: 2,
    incorrectAnswers: 1,
    updateStudyStats(isCorrect: boolean) {
      this.studyCount++;
      if (isCorrect) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
    },
    getAccuracyRate() {
      if (this.studyCount === 0) return 0;
      return this.correctAnswers / this.studyCount;
    },
  },
  {
    id: "3",
    question: "Being equal in status or rights",
    answer: "equality",
    categoryId: "2",
    userId: "1",
    difficulty: DifficultyLevel.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6",
    studyCount: 7,
    correctAnswers: 6,
    incorrectAnswers: 1,
    updateStudyStats(isCorrect: boolean) {
      this.studyCount++;
      if (isCorrect) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
    },
    getAccuracyRate() {
      if (this.studyCount === 0) return 0;
      return this.correctAnswers / this.studyCount;
    },
  },
]

export interface FlashcardDatasource {
  getAll(): Promise<FlashcardEntity[]>
  getById(id: string): Promise<FlashcardEntity | null>
  create(flashcard: Omit<FlashcardEntity, "id" | "createdAt" | "updatedAt">): Promise<FlashcardEntity>
  update(id: string, flashcard: Partial<FlashcardEntity>): Promise<FlashcardEntity | null>
  delete(id: string): Promise<FlashcardEntity | null>
  getByUserId(userId: string): Promise<FlashcardEntity[]>
  getByCategoryId(categoryId: string): Promise<FlashcardEntity[]>
  searchByContent(query: string, userId: string): Promise<FlashcardEntity[]>
}

export class MemoryFlashcardDatasource implements FlashcardDatasource {
  private flashcards: FlashcardEntity[] = [...initialFlashcards]

  async getAll(): Promise<FlashcardEntity[]> {
    return [...this.flashcards]
  }

  async getById(id: string): Promise<FlashcardEntity | null> {
    const flashcard = this.flashcards.find((f) => f.id === id)
    if (!flashcard) return null
    return {
      ...flashcard,
      updateStudyStats: flashcard.updateStudyStats,
      getAccuracyRate: flashcard.getAccuracyRate,
    }
  }

  async create(flashcard: Omit<FlashcardEntity, "id" | "createdAt" | "updatedAt">): Promise<FlashcardEntity> {
    const now = new Date()
    const newFlashcard: FlashcardEntity = {
      ...flashcard,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      studyCount: flashcard.studyCount || 0,
      correctAnswers: flashcard.correctAnswers || 0,
      incorrectAnswers: flashcard.incorrectAnswers || 0,
    }

    this.flashcards.push(newFlashcard)
    return { ...newFlashcard }
  }

  async update(id: string, flashcard: Partial<FlashcardEntity>): Promise<FlashcardEntity | null> {
    const index = this.flashcards.findIndex((f) => f.id === id)
    if (index === -1) return null

    const updatedFlashcard = {
      ...this.flashcards[index],
      ...flashcard,
      updatedAt: new Date(),
    }

    this.flashcards[index] = updatedFlashcard
    return { ...updatedFlashcard }
  }

  async delete(id: string): Promise<FlashcardEntity | null> {
    const index = this.flashcards.findIndex((f) => f.id === id)
    if (index === -1) return null

    const deletedFlashcard = this.flashcards[index]
    this.flashcards.splice(index, 1)
    return { ...deletedFlashcard }
  }

  async getByUserId(userId: string): Promise<FlashcardEntity[]> {
    return this.flashcards.filter((f) => f.userId === userId).map((f) => ({ ...f }))
  }

  async getByCategoryId(categoryId: string): Promise<FlashcardEntity[]> {
    return this.flashcards.filter((f) => f.categoryId === categoryId).map((f) => ({ ...f }))
  }

  async searchByContent(query: string, userId: string): Promise<FlashcardEntity[]> {
    const lowercaseQuery = query.toLowerCase()
    return this.flashcards
      .filter(
        (f) =>
          f.userId === userId &&
          (f.question.toLowerCase().includes(lowercaseQuery) || f.answer.toLowerCase().includes(lowercaseQuery)),
      )
      .map((f) => ({ ...f }))
  }
}
