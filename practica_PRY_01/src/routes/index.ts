import { Router } from "express"
import donorRoutes from "./donor.routes"
import donationTypeRoutes from "./donation-type.routes"
import donationRoutes from "./donation.routes"

const router = Router()

// Configurar rutas
router.use("/donors", donorRoutes)
router.use("/donation-types", donationTypeRoutes)
router.use("/donations", donationRoutes)

export default router
