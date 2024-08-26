import * as dotenv from 'dotenv';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ExceptionError } from 'src/lib/variables/exception-error';

// Для использования .env файлов
dotenv.config();

type UserJwtPayload = {
  id: string;
  password: string;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
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
      throw new UnauthorizedException(ExceptionError.USER_NOT_FOUND);
    }

    // Валидация пароля
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(ExceptionError.BAD_PASSWORD);
    }

    return this.login({ id: user.id, password: user.password });
  };

  /**
   * Метод выдачи токена / аутентификация (arrow function)
   */
  login = async (payload: UserJwtPayload) => {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  };

  /**
   * Метод валидация токена, проверка прав доступа / авторизация (arrow function)
   */
  validateToken = async (accessToken: string) => {
    return this.jwtService.verifyAsync<UserJwtPayload>(accessToken)
  };
}
