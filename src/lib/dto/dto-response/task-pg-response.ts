import { TaskState } from 'src/lib/variables/task-state';
/**
 * DTO для возвращаемых данных для задач
 */
export type Task_PG_RS = {
  // ID задачи - UUID (универсальный уникальный идентификатор)
  id: string;

  // Название задачи
  name: string;

  // Текстовое описание задачи
  description: string;

  // Состояния задачи, состоит из enum = backlog, in-progress, done
  state: TaskState;

  // ID пользователя для связи
  user_id: string;

  // Дата создания задачи
  created_at: Date;

  // Дата обновления задачи
  updated_at: Date;
};
