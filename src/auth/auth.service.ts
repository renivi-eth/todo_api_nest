import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from 'nest-knexjs';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BAD_PASSWORD, USER_NOT_FOUND } from 'src/lib/variables/exception-error';

// Для использования .env файлов
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
    // Инжектируем для работы с User (create, find)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Метод сервиса для валидации юзера в БД (arrow function)
   */
  validateUser = async (email: string, password: string) => {
    const user = await this.userService.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    // Валидация пароля
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(BAD_PASSWORD);
    }

    return this.login(user.id, user.password);
  };

  /**
   * Метод выдачи токена / аутентификация (arrow function)
   */
  login = async (id: string, password: string) => {
    const payload = { id, password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  };
  /**
   * Метод валидация токена, проверка прав доступа / авторизация (arrow function)
   */
  validateToken = async (token: string) => {
    return this.jwtService.verifyAsync(token).catch((error) => {
      console.error('Error verifying token:');
      throw new UnauthorizedException('Invalid or expired JWT token');
    });
  };
}
