import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

/**
 * 1. Как правильно подключить бд и работать с ней? - хз
 * 2. Как переписать все через репозиторий или квери билдер?
 * 3. Как дальше все бля переписать?
 * 4. Как работать с миграциями?
 */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // Указываем путь, откуда используем сущности
      entities: [User],
      // Если true, то синхронизируется с БД автоматически, а нам нужны миграции
      synchronize: false,
    }),
  ],

  exports: [],

  providers: [],

  controllers: [],
})
export class TypeOrmDbModule {}
