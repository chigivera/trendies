import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuration CORS
  app.enableCors()

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle("API de Gestion de Commandes")
    .setDescription("API pour l'application de gestion de commandes")
    .setVersion("1.0")
    .addTag("orders")
    .addTag("customers")
    .addTag("products")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  // Préfixe global pour les routes API
  app.setGlobalPrefix("api")

  await app.listen(3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
