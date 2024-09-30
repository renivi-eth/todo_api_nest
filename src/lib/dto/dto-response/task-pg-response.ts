import { ApiProperty } from '@nestjs/swagger';
import { TaskState } from 'src/lib/variables/task-state';
/**
 * DTO для возвращаемых данных для задач
 */
export class Task_PG_RS {
  @ApiProperty({ description: 'TODO' })
  // ID задачи - UUID (универсальный уникальный идентификатор)
  id: string;

  @ApiProperty({ description: 'TODO' })
  // Название задачи
  name: string;

  @ApiProperty({ description: 'TODO' })
  // Текстовое описание задачи
  description: string;

  @ApiProperty({ description: 'TODO' })
  // Состояния задачи, состоит из enum = backlog, in-progress, done
  state: TaskState;

  @ApiProperty({ description: 'TODO' })
  // ID пользователя для связи
  user_id: string;

  @ApiProperty({ description: 'TODO' })
  // Дата создания задачи
  created_at: Date;

  @ApiProperty({ description: 'TODO' })
  // Дата обновления задачи
  updated_at: Date;
}
