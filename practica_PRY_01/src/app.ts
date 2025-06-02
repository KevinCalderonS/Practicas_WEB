import express from "express"
import cors from "cors"
import { AppDataSource } from "./models/data-source"
import routes from "./routes"

// Inicializar express
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.use("/api", routes)

// Inicializar la base de datos y el servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos inicializada correctamente")

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Error al inicializar la base de datos:", error)
  })

export default app
