import { IsEmail, IsString, Length } from 'class-validator';

/**
 * DTO
 */
export class CreateUser_FR_RQ {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
