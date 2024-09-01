import { IsEmail } from 'class-validator';
import { IsStrongPassword } from '../../lib/decorators/validate-password';
/**
 * DTO для входных данных для создания и поиска пользователя
 */
export class User_FR_RQ {
  // e-mail пользователя
  @IsEmail()
  email: string;

  // Пароль пользователя
  @IsStrongPassword()
  password: string;
}
