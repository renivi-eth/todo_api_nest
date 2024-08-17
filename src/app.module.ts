import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { TagModule } from './tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'nest_learn/.env',
    }),
    AuthModule,
    TaskModule,
    TagModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
