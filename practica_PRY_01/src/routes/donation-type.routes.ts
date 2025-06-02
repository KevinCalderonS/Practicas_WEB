import { Router } from "express"
import { DonationTypeController } from "../controllers/donation-type.controller"

const router = Router()

// Rutas para tipos de donación
router.get("/", async (req, res, next) => {
	try {
		await DonationTypeController.getAll(req, res);
	} catch (err) {
		next(err);
	}
});
router.get("/:id", async (req, res, next) => {
	try {
		await DonationTypeController.getById(req, res);
	} catch (err) {
		next(err);
	}
});
router.post("/", async (req, res, next) => {
	try {
		await DonationTypeController.create(req, res);
	} catch (err) {
		next(err);
	}
});
router.put("/:id", async (req, res, next) => {
	try {
		await DonationTypeController.update(req, res);
	} catch (err) {
		next(err);
	}
});
router.delete("/:id", async (req, res, next) => {
	try {
		await DonationTypeController.delete(req, res);
	} catch (err) {
		next(err);
	}
});

export default router
