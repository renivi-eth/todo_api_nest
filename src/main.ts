import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

const API_VERSION = process.env.API_VERSION;

const port = process.env.APP_PORT ?? 3001;

async function bootstrap() {
  const startTimestamp = Date.now();

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
    // Swagger UI - http://localhost:3000/api
    // JSON format: http://localhost:3000/swagger/json
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(port);

  printWelcomeMessage(startTimestamp);
}

const printWelcomeMessage = (startTimestamp: number) => {
  Logger.warn('---------------------------------------------');

  Logger.log('Server started successfully in ' + (Date.now() - startTimestamp) + 'ms');

  Logger.log(`Server is running on http://localhost:${port}/${API_VERSION}`);
  Logger.log(`API documentation is running on http://localhost:${port}/api`);

  Logger.warn('---------------------------------------------');
};

bootstrap();
