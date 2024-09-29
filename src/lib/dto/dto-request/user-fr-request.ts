import { IsEmail } from 'class-validator';
import { IsStrongPassword } from '../../decorators/validate-password';

import { ApiProperty } from '@nestjs/swagger';
/**
 * DTO для входных данных для создания и поиска пользователя
 */
export class User_FR_RQ {
  // e-mail пользователя
  @ApiProperty({ description: 'User Email' })
  @IsEmail()
  email: string;

  // Пароль пользователя
  @ApiProperty({ description: 'Strong Passowrd' })
  @IsStrongPassword()
  password: string;
}
