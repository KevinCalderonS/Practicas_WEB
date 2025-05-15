import { Router } from "express"
import { DonationController } from "../controllers/donation.controller"

const router = Router()

// Rutas para donaciones
router.get("/", async (req, res) => {
	try {
		await DonationController.getAll(req, res);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
})
router.get("/:id", async (req, res) => {
	try {
		await DonationController.getById(req, res);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
})
router.post("/", async (req, res) => {
	try {
		await DonationController.create(req, res);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
})
router.put("/:id", async (req, res) => {
	try {
		await DonationController.update(req, res);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
})
router.delete("/:id", async (req, res) => {
	try {
		await DonationController.delete(req, res);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
})

export default router
