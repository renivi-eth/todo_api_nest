import { TaskState } from 'src/lib/variables/task.state';

/**
 * TaskEntity - интерфейс описывает структуру таблицы task
 */
export interface TaskEntity {
  id: string;
  name: string;
  description: string;
  state: TaskState;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
