import { join } from 'path';
import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    // Глобальное подключение через forRoot()
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname, '/../database/entities/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '/../database/migrations/*{.js,.ts}')],
      synchronize: false,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    AuthModule,

    TaskModule,

    TagModule,
  ],

  exports: [],

  providers: [],

  controllers: [],
})
export class AppModule {}
