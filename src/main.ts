import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

const API_VERSION = process.env.API_VERSION;

const port = process.env.APP_PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_VERSION);

  app.useGlobalPipes(new ValidationPipe());

  // Конфиг Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo API with NestJS')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('1.0')
    .addTag('Nest Todo API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    // JSON format: http://localhost:3000/swagger/json
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(port);

  Logger.log(`Server is started on ${port} port!`, bootstrap.name);
}

bootstrap();
