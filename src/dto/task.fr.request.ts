import { IsEnum, IsString, IsUUID } from 'class-validator';
import { TaskState } from 'src/lib/variables/task.state';

/**
 * DTO для входных данных на task endpoints
 */
export class Task_FR_RQ {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(TaskState)
  state: TaskState;
}
