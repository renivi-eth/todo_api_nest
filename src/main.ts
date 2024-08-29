import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

dotenv.config();

const API_VERSION = 'api/v1';

const port = process.env.APP_PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_VERSION);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  Logger.log(`Server is started on ${port} port`, bootstrap.name);
}

bootstrap();
