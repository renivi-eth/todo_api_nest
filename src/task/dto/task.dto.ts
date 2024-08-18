import { IsEnum, IsString } from 'class-validator';
import { TaskState } from 'src/lib/variables/task.state';

export class TaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(TaskState)
  state: TaskState;
}
