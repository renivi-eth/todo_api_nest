import { TaskState } from 'src/lib/variables/task-state';
import { IsEnum, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * DTO для валидации входных данных на создание таски
 */
export class Task_FR_RQ {
  @ApiProperty({ description: 'task name' })
  // Имя задачи
  @IsString()
  @Length(0, 30)
  name: string;

  @ApiProperty({ description: 'task description' })
  // Описание задачи
  @IsString()
  description: string;

  @ApiProperty({ description: 'task state' })
  // Состояния задачи
  @IsEnum(TaskState)
  state: TaskState;
}
