import type { StudySessionEntity } from "../entities/study-session.entity"
import type { CreateStudySessionDto } from "../dtos/study-session/create-study-session.dto"

export abstract class StudySessionRepository {
  abstract create(createStudySessionDto: CreateStudySessionDto): Promise<StudySessionEntity>
  abstract findById(id: string): Promise<StudySessionEntity>
  abstract findByUserId(userId: string): Promise<StudySessionEntity[]>
  abstract updateById(id: string, updateData: Partial<StudySessionEntity>): Promise<StudySessionEntity>
  abstract getActiveSession(userId: string): Promise<StudySessionEntity | null>
  abstract getUserStats(userId: string, dateFrom?: Date, dateTo?: Date): Promise<any>
}
