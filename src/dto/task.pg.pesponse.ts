import { TaskState } from 'src/lib/variables/task.state';
/**
 * DTO для возвращаемых данных для /task
 */
export type Task_PG_RS = {
  id: string;
  name: string;
  description: string;
  state: TaskState;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};
