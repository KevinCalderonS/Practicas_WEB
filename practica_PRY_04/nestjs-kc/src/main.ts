import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configurar prefijo global para la API
  app.setGlobalPrefix("api/v1")

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(3000)
  console.log("Aplicación ejecutándose en: http://localhost:3000/api/v1")
}
bootstrap()
