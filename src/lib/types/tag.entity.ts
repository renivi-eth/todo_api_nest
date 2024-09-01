/**
 * TagEntity (Knex.js) - интерфейс, описывает структуру таблицы tag
 */
export interface TagEntity {
  // ID - UUID (универсальный уникальный идентификатор) - ID задачи
  id: string;

  // name - текстовое описание задачи
  name: string;

  // user_id - UUID (универсальный уникальный идентификатор) - ID пользователя
  user_id: string;

  // created_at - Date, дата создания задачи
  created_at: Date;

  // updated_at - Date; дата обновления задачи
  updated_at: Date;
}
