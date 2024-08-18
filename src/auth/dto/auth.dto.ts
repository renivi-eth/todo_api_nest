import { IsEmail, IsString, Length } from 'class-validator';

/**
 * DTO, принимает данные от клиента
 */
export class CreateUser_FR_RQ {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 12)
  password: string;
}


/**
 * DTO, которая отдает ответ
 */
export class UserResponseDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
