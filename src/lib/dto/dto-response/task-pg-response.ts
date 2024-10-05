import { ApiProperty } from '@nestjs/swagger';
import { TaskState } from 'src/lib/variables/task-state';
/**
 * DTO для возвращаемых данных для задач
 */
export class Task_PG_RS {
  @ApiProperty({ description: 'Task ID (UUID)' })
  // ID задачи - UUID (универсальный уникальный идентификатор)
  id: string;

  @ApiProperty({ description: 'Text name task' })
  // Название задачи
  name: string;

  @ApiProperty({ description: 'Text description task' })
  // Текстовое описание задачи
  description: string;

  @ApiProperty({ description: 'State a task' })
  // Состояния задачи, состоит из enum = backlog, in-progress, done
  state: TaskState;

  @ApiProperty({ description: 'User ID (UUID)' })
  // ID пользователя для связи
  user_id: string;

  @ApiProperty({ description: 'Created Date' })
  // Дата создания задачи
  created_at: Date;

  @ApiProperty({ description: 'Updated Date' })
  // Дата обновления задачи
  updated_at: Date;
}
