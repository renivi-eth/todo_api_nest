import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для возвращаемых данных для тэгов
 */
export class Tag_PG_RS {
  // ID тэга (UUID)
  @ApiProperty({ description: 'Tag ID (UUID)' })
  id: string;

  // Имя тэга
  @ApiProperty({ description: 'Tag name (string)' })
  name: string;

  // ID пользователя для связи
  @ApiProperty({ description: 'User ID (UUID)' })
  user_id: string;

  // Дата создания
  @ApiProperty({ description: 'Created date' })
  created_at: Date;

  // Дата обновления
  @ApiProperty({ description: 'Updated date' })
  updated_at: Date;
}
