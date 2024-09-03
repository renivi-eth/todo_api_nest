import { Exclude } from 'class-transformer';

/**
 * DTO для возвращаемых данных для createUser() / findUser()
 */
export type User_PG_RS = {
  // Email пользователя
  email: string;

  // ID пользователя, UUID (универсальный уникальный идентификатор)
  id: string;

  // Дата создания юзера
  created_at: Date;

  // Дата обновления юзера
  updated_at: Date;
};
