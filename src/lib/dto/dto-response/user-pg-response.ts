import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для возвращаемых данных для createUser() / findUser()
 */
export class User_PG_RS {
  // Email пользователя
  @ApiProperty({ description: 'User Email' })
  email: string;

  // ID пользователя, UUID (универсальный уникальный идентификатор)
  @ApiProperty({ description: 'User ID, UUID' })
  id: string;

  // Дата создания юзера
  @ApiProperty({ description: 'Created Date' })
  created_at: Date;

  // Дата обновления юзер
  @ApiProperty({ description: 'Updated Date' })
  updated_at: Date;
}
