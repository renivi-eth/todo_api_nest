/**
 * DTO для возвращаемых данных для тэгов
 */
export type Tag_PG_RS = {
  // ID тэга (UUID)
  id: string;

  // Имя тэга
  name: string;

  // ID пользователя для связи
  user_id: string;

  // Дата создания
  created_at: Date;

  // Дата обновления
  updated_at: Date;
};
