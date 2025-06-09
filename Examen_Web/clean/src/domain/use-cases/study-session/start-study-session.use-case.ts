import type { StudySessionEntity } from "../../entities/study-session.entity"
import type { CreateStudySessionDto } from "../../dtos/study-session/create-study-session.dto"
import type { StudySessionRepository } from "../../repositories/study-session.repository"
import type { FlashcardRepository } from "../../repositories/flashcard.repository"

interface StartStudySessionUseCase {
  execute(createStudySessionDto: CreateStudySessionDto): Promise<StudySessionEntity>
}

export class StartStudySession implements StartStudySessionUseCase {
  constructor(
    private readonly studySessionRepository: StudySessionRepository,
    private readonly flashcardRepository: FlashcardRepository,
  ) {}

  async execute(createStudySessionDto: CreateStudySessionDto): Promise<StudySessionEntity> {
    // Check if user has an active session
    const activeSession = await this.studySessionRepository.getActiveSession(createStudySessionDto.userId)
    if (activeSession) {
      throw new Error("User already has an active study session")
    }

    // Get available flashcards
    let flashcards
    if (createStudySessionDto.categoryId) {
      flashcards = await this.flashcardRepository.findByCategoryId(createStudySessionDto.categoryId)
    } else {
      flashcards = await this.flashcardRepository.findByUserId(createStudySessionDto.userId)
    }

    if (flashcards.length === 0) {
      throw new Error("No flashcards available for study session")
    }

    // Limit total cards to available flashcards
    const totalCards = Math.min(createStudySessionDto.totalCards, flashcards.length)

    const sessionData = {
      ...createStudySessionDto,
      totalCards,
    }

    return await this.studySessionRepository.create(sessionData)
  }
}
