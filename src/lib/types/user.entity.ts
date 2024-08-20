/**
 * UserEntity (Knex.js) - entity описывает структуру таблицы user 
 */
export interface UserEntity {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
