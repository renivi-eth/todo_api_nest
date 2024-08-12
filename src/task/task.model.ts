/**
 * Решить, где хранить enum отдельно или тут
 */
export enum TaskState {
  BACKLOG = 'backlog',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export class TaskModelTs {
  id: string;
  name: string;
  description: string;
  state: TaskState;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
