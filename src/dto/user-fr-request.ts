import { IsEmail } from 'class-validator';

import { isStrongPassword } from '../lib/decorators/validate-password';
/**
 * DTO для входных данных для создания и поиска пользователя
 */
export class User_FR_RQ {
  @IsEmail()
  email: string;

  // Кастомный декоратор:
  @isStrongPassword()
  password: string;
}
