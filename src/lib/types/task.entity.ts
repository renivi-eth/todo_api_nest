import { TaskState } from 'src/lib/variables/task-state';

/**
 * TaskEntity - интерфейс описывает структуру таблицы task
 */
export interface TaskEntity {
  // ID - UUID (универсальный уникальный идентификатор) - ID задачи
  id: string;

  // name - текстовое описание задачи
  name: string;

  // description - текстовое описание тега - string
  description: string;

  // state - состояние задачи, enum - backlog, in-progress, done
  state: TaskState;

  // UUID - ID пользователя
  user_id: string;

  // created_at - Date, дата создания задачи
  created_at: Date;

  // updated_at - Date; дата обновления задачи
  updated_at: Date;
}
