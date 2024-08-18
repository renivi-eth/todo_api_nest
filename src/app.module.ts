import { Module } from '@nestjs/common';

import { TagModule } from './tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      // TODO: Указать до файла .env в корне. Учесть что есть build и dev
      envFilePath: '.env',
    }),

    DatabaseModule,

    AuthModule,
    TaskModule,
    TagModule,
  ],

  exports: [],

  providers: [],

  controllers: [],
})
export class AppModule {}
