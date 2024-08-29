/**
 * TagEntity (Knex.js) - интерфейс, описывает структуру таблицы tag
 */
export interface TagEntity {
  // ID - UUID (универсальный уникальный идентификатор)
  id: string;

  // name - текстовое описание задачи
  name: string;

  // user_id - UUID (универсальный уникальный идентификатор)
  user_id: string;

  // created_at - Date, дата создания задачи в формате
  created_at: Date;

  // updated_at - Date; дата обновления задачи
  updated_at: Date;
}
