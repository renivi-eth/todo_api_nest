/**
 * Три состояния задачи, созданной юзером
 */
export enum TaskState {
  // В бэклоге
  BACKLOG = 'backlog',

  // В текущем прогрессе
  IN_PROGRESS = 'in-progress',

  // Выполнена
  DONE = 'done',
}
