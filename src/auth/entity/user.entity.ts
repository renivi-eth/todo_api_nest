/**
 * UserEntity для работы с Knex
 */
interface UserEntity {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
