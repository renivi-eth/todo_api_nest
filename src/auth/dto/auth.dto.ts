/**
 * DTO, принимает данные от клиента
 */
export class CreateUserDto {
  email: string;
  password: string;
}

/**
 * DTO, которая отдает ответ
 */
export class UserResponseDto {
  email: string;
  password: string;
}
