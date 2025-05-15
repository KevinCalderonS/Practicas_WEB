import "reflect-metadata"
import { AppDataSource } from "./models/data-source"
import app from "./app"

const PORT = process.env.PORT || 3000

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
