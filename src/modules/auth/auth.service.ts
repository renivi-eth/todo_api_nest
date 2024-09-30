import * as dotenv from 'dotenv';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { UserJwtPayload } from 'src/lib/types/user-jwt-payload';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { Injectable, UnauthorizedException } from '@nestjs/common';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
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
   * Метод валидация токена, проверка прав доступа / авторизация (arrow function), используется в Auth.guard
   */
  validateToken = async (accessToken: string) => {
    return this.jwtService.verifyAsync<UserJwtPayload>(accessToken);
  };
}
