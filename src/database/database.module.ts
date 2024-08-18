import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { CheckConnectionService } from './check-connection.service';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        // TODO: не видит user, pass, database (решено, через main.ts imports dotenv, исправить)
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
  exports: [CheckConnectionService],
  providers: [CheckConnectionService],
})
export class DatabaseModule {}
