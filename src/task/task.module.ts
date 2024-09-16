import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskController } from './task.controller';
import { Task } from 'src/lib/entities/task.entity';

@Module({
  // Используем модульный подход
  imports: [AuthModule, TypeOrmModule.forFeature([Task])],

  exports: [],

  providers: [TaskService],

  controllers: [TaskController],
})
export class TaskModule {}
