import type { Request, Response } from "express"
import type { FlashcardService } from "../../application/services/flashcard.service"
import { CreateFlashcardDto } from "../../domain/dtos/flashcard/create-flashcard.dto"
import { UpdateFlashcardDto } from "../../domain/dtos/flashcard/update-flashcard.dto"

export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  public getAllFlashcards = async (req: Request, res: Response) => {
    try {
      const flashcards = await this.flashcardService.getAllFlashcards()
      return res.status(200).json(flashcards)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public getFlashcardById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const flashcard = await this.flashcardService.getFlashcardById(id)
      return res.status(200).json(flashcard)
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        return res.status(404).json({ message: error.message })
      }
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public createFlashcard = async (req: Request, res: Response) => {
    try {
      const [error, createFlashcardDto] = CreateFlashcardDto.create(req.body)

      if (error) {
        return res.status(400).json({ message: error })
      }

      const flashcard = await this.flashcardService.createFlashcard(createFlashcardDto!)
      return res.status(201).json(flashcard)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public updateFlashcard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const [error, updateFlashcardDto] = UpdateFlashcardDto.create(req.body)

      if (error) {
        return res.status(400).json({ message: error })
      }

      const flashcard = await this.flashcardService.updateFlashcard(id, updateFlashcardDto!)
      return res.status(200).json(flashcard)
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        return res.status(404).json({ message: error.message })
      }
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public deleteFlashcard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const flashcard = await this.flashcardService.deleteFlashcard(id)
      return res.status(200).json(flashcard)
    } catch (error) {
      if (error instanceof Error && error.message.includes("not found")) {
        return res.status(404).json({ message: error.message })
      }
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public getFlashcardsByUserId = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const flashcards = await this.flashcardService.getFlashcardsByUserId(userId)
      return res.status(200).json(flashcards)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public getFlashcardsByCategoryId = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params
      const flashcards = await this.flashcardService.getFlashcardsByCategoryId(categoryId)
      return res.status(200).json(flashcards)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error })
    }
  }

  public searchFlashcards = async (req: Request, res: Response) => {
    try {
      const { query, userId } = req.query

      if (!query || !userId) {
        return res.status(400).json({ message: "Query and userId are required" })
      }

      const flashcards = await this.flashcardService.searchFlashcards(query.toString(), userId.toString())
      return res.status(200).json(flashcards)
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error })
    }
  }
}
