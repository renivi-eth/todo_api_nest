import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

dotenv.config();

const API_VERSION = 'api/v1';

const port = process.env.APP_PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_VERSION);

  await app.listen(port);

  Logger.log(`Server is started on ${port} port`, bootstrap.name);
}

bootstrap();
