import express from "express"
import { flashcardRoutes } from "./presentation/routes/flashcard.routes"

// Crear la aplicación Express
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para parsear JSON
app.use(express.json())

// Rutas
app.use("/api/flashcards", flashcardRoutes)

// Ruta de salud
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
