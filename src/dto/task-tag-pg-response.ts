/**
 * DTO для возвращаемых данных для :tagId/task/:taskId
 */
export type Task_Tag_PG_RS = {
  // taskId - UUID тип, ID задачи
  taskId: string;

  // tagId - UUID тип, ID тэга
  tagId: string;
};
