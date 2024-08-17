import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const API_VERSION = 'api/v1';
const port = process.env.APP_PORT || 3030;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_VERSION);
  console.log(`Server is running on port ${port}`);
  await app.listen(3000);
}
bootstrap();
