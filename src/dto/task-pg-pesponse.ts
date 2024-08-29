import { TaskState } from 'src/lib/variables/task-state';
/**
 * DTO для возвращаемых данных от PostgreSQL для /task
 */
export type Task_PG_RS = {
  // ID задачи - UUID (универсальный уникальный идентификатор)
  id: string;

  // name - текстовое название задачи
  name: string;

  // description - текстовое описание задачи
  description: string;

  // state - состояния задачи, состоит из enum = backlog, in-progress, done
  state: TaskState;

  // user_id - ID пользователя, UUID
  user_id: string;

  // created_at - Date, дата создания задачи в формате
  created_at: Date;

  // updated_at - Date; дата обновления полей задачи
  updated_at: Date;
};
