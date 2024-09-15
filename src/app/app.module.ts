import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/lib/entities/user.entity';

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
      entities: [User],
      synchronize: false,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
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
