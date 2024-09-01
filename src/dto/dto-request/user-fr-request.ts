import { IsEmail } from 'class-validator';
import { isStrongPassword } from '../../lib/decorators/validate-password';
/**
 * DTO для входных данных для создания и поиска пользователя
 */
export class User_FR_RQ {
  // Проверка что e-mail валидный
  @IsEmail()
  email: string;

  //Кастомный декоратор, проверяет что пароль это строка, имеет длину больше 8 символов, содержит хотя бы одну заглавный и строчный символ, и содержит хотя бы одну цифры
  @isStrongPassword()
  password: string;
}
