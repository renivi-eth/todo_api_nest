import { IsEmail, IsString, Length } from 'class-validator';

/**
 * DTO
 */
export class User_FR_RQ {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
