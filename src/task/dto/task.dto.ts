import { TaskState } from 'src/lib/variables/task.state';

export class TaskDto {
  name: string;
  description: string;
  state: TaskState;
}
