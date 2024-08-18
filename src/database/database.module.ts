import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { CheckConnectionService } from './check-connection.service';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',

        // TODO: Заменить примитивы на переменные окружения process.env
        connection: {
          host: process.env.POSTGRES_HOST,
          user: 'admin',
          port: parseInt(process.env.POSTGRES_PORT),
          password: 'cXdlcnR5MTIzNDU=',
          database: 'todo',
        },
      },
    }),
  ],

  exports: [],

  providers: [CheckConnectionService],

  controllers: [],
})
export class DatabaseModule {}
