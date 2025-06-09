import { Router } from "express"
import { FlashcardController } from "../controllers/flashcard.controller"
import { FlashcardService } from "../../application/services/flashcard.service"
import { FlashcardRepositoryImpl } from "../../infrastructure/repositories/flashcard.repository.impl"
import { MemoryFlashcardDatasource } from "../../infrastructure/datasource/memory/flashcard.datasource"

// Crear instancias
const datasource = new MemoryFlashcardDatasource()
const repository = new FlashcardRepositoryImpl(datasource)
const service = new FlashcardService(repository)
const controller = new FlashcardController(service)

// Crear router
export const flashcardRoutes = Router()

// Utilidad para manejar errores en controladores async
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

// Definir rutas
flashcardRoutes.get("/", asyncHandler(controller.getAllFlashcards))
flashcardRoutes.get("/search", asyncHandler(controller.searchFlashcards))
flashcardRoutes.get("/user/:userId", asyncHandler(controller.getFlashcardsByUserId))
flashcardRoutes.get("/category/:categoryId", asyncHandler(controller.getFlashcardsByCategoryId))
flashcardRoutes.get("/:id", asyncHandler(controller.getFlashcardById))
flashcardRoutes.post("/", asyncHandler(controller.createFlashcard))
flashcardRoutes.put("/:id", asyncHandler(controller.updateFlashcard))
flashcardRoutes.delete("/:id", asyncHandler(controller.deleteFlashcard))
