import { TaskState } from 'src/lib/variables/task-state';
import { IsEnum, IsString, Length } from 'class-validator';
/**
 * DTO для валидации входных данных на создание таски
 */
export class Task_FR_RQ {
  // Имя задачи
  @IsString()
  @Length(0, 30)
  name: string;

  // Описание задачи
  @IsString()
  description: string;

  // Состояния задачи
  @IsEnum(TaskState)
  state: TaskState;
}
