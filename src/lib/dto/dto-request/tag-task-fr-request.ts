import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
/**
 * DTO для валидации входных данных для /:tagId/task/:taskId (создание связи между задачей и тэгом по ID)
 */
export class TagTask_FR_RQ {
  @ApiProperty({ description: 'taskId (UUID)' })
  @IsUUID()
  taskId: string;

  @ApiProperty({ description: 'tagId (UUID)' })
  @IsUUID()
  tagId: string;
}
