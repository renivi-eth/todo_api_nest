import { IsEmail, IsString } from 'class-validator';

/**
 * DTO, принимает данные от клиента
 */
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  //TODO: не работает @Min / @Max
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
