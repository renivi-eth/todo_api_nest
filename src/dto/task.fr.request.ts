import { IsEnum, IsString, Length } from 'class-validator';
import { TaskState } from 'src/lib/variables/task.state';
/**
 * DTO для входных данных на /task
 */
export class Task_FR_RQ {
  @IsString()
  @Length(0, 30)
  name: string;

  @IsString()
  description: string;

  @IsEnum(TaskState)
  state: TaskState;
}
