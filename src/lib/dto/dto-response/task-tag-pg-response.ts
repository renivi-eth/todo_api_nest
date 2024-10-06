import { ApiProperty } from '@nestjs/swagger';
/**
 * DTO для возвращаемых данных для связи задачи с тэгом
 */
export class Task_Tag_PG_RS {
  // taskId - UUID тип, ID задачи
  @ApiProperty({ description: 'task ID' })
  taskId: string;

  // tagId - UUID тип, ID тэга
  @ApiProperty({ description: 'tag ID' })
  tagId: string;
}
