import { TaskState } from 'src/lib/variables/task-state';
import { IsEnum, IsString, Length } from 'class-validator';
/**
 * DTO для валидации входных данных на /task
 */
export class Task_FR_RQ {
  // Валидация name (текстовое название задачи) - строка, длина от 0 до 30 символов
  @IsString()
  @Length(0, 30)
  name: string;

  // Валидация description - текстовое описание тега - string
  @IsString()
  description: string;

  // Валидация состояния задачи, в виде enum - backlog, in-progress, done
  @IsEnum(TaskState)
  state: TaskState;
}
