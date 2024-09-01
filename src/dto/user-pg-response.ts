import { Exclude } from 'class-transformer';

/**
 * DTO для возвращаемых данных для createUser() / findUser()
 */
export type User_PG_RS = {
  // Email пользователя
  email: string;

  // ID пользователя, UUID (универсальный уникальный идентификатор)
  id: string;

  // created_at - Date, дата создания пользователя в формате
  created_at: Date;

  // updated_at - Date; дата обновления полей пользователя
  updated_at: Date;
};
