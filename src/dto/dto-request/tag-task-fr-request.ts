import { IsUUID } from 'class-validator';
/**
 * DTO для валидации входных данных для /:tagId/task/:taskId (создание связи между задачей и тэгом по ID)
 */
export class TagTask_FR_RQ {
  @IsUUID()
  taskId: string;

  @IsUUID()
  tagId: string;
}
