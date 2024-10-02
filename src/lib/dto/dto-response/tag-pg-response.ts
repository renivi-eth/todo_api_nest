import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для возвращаемых данных для тэгов
 */
export class Tag_PG_RS {
  // ID тэга (UUID)
  @ApiProperty({ description: 'TODO' })
  id: string;

  // Имя тэга
  @ApiProperty({ description: 'TODO' })
  name: string;

  // ID пользователя для связи
  @ApiProperty({ description: 'TODO' })
  user_id: string;

  // Дата создания
  @ApiProperty({ description: 'TODO' })
  created_at: Date;

  // Дата обновления
  @ApiProperty({ description: 'TODO' })
  updated_at: Date;
}
