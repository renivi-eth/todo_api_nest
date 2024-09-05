import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'cXdlcnR5MTIzNDU=',
      database: 'todo',
      entities: [],
      // Если true, то синхронизируется с БД автоматически, а нам нужны ручные миграции
      synchronize: false,
    }),
  ],
})
export class TypeOrmDbModule {}
