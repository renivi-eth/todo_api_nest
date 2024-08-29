/**
 * UserEntity - интерфейс описывает структуру таблицы user
 */
export interface UserEntity {
  // ID пользователя - UUID (универсальный уникальный идентификатор)
  id: string;

  // E-mail пользователя, макс 256 символов
  email: string;

  // Пароль пользователя (хэшируемый)
  password: string;

  // created_at - Date, дата создания пользователя в формате
  created_at: Date;

  // updated_at - Date; дата изменения полей пользователя задачи
  updated_at: Date;
}
