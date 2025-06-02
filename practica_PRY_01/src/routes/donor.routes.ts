import { Router } from "express"
import { DonorController } from "../controllers/donor.controller"

const router = Router()

// Rutas para donantes
router.get("/", async (req, res, next) => {
	try {
		await DonorController.getAll(req, res);
	} catch (err) {
		next(err);
	}
})
router.get("/:id", async (req, res, next) => {
	try {
		await DonorController.getById(req, res);
	} catch (err) {
		next(err);
	}
})
router.post("/", async (req, res, next) => {
	try {
		await DonorController.create(req, res);
	} catch (err) {
		next(err);
	}
})
router.put("/:id", async (req, res, next) => {
	try {
		await DonorController.update(req, res);
	} catch (err) {
		next(err);
	}
})
router.delete("/:id", async (req, res, next) => {
	try {
		await DonorController.delete(req, res);
	} catch (err) {
		next(err);
	}
})

export default router
