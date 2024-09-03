/**
 * DTO для возвращаемых данных для связи задачи с тэгом
 */
export type Task_Tag_PG_RS = {
  // taskId - UUID тип, ID задачи
  taskId: string;

  // tagId - UUID тип, ID тэга
  tagId: string;
};
