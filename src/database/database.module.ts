import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { CheckConnectionService } from './check-connection.service';

import * as dotenv from 'dotenv';
// Для использования .env файлов
dotenv.config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',

        // TODO: Заменить примитивы на переменные окружения process.env
        connection: {
          host: process.env.POSTGRES_HOST,
          user: process.env.POSTGRES_USER,
          port: parseInt(process.env.POSTGRES_PORT),
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
        },
      },
    }),
  ],

  exports: [],

  providers: [CheckConnectionService],

  controllers: [],
})
export class DatabaseModule {}
