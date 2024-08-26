import { IsEmail, IsString, Length } from 'class-validator';
/**
 * DTO для входных данных для создания и поиска пользователя
 */
export class User_FR_RQ {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  // Написать свой валидатор для пароля
  password: string;
}
