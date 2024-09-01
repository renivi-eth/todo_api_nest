/**
 * TagTaskEntity (Knex.js) - интерфейс, описывает структуру таблицы tag
 */
export interface TagTaskEntity {
  //  ID - UUID (универсальный уникальный идентификатор) ID задачи
  taskId: string;

  //  ID - UUID (универсальный уникальный идентификатор) ID тэга
  tagId: string;
}
