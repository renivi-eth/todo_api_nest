/**
 * TagEntity (Knex.js) - интерфейс, описывает структуру таблицы tag
 */
export interface TagEntity {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
