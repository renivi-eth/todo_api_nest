import { Knex } from 'knex';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { InjectConnection } from 'nest-knexjs';
import { CreateUser_FR_RQ } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BAD_PASSWORD, USER_NOT_FOUND } from 'src/lib/variables/exception-error';

// TODO:
//  1. Перенести логику работы с юзерами в отдельный сервис
//  2. Заменить все методы на стрелочные функции
//  3. Задать правильный нейминг всем типам (про логику нейминга добавить в документацию readme.md)
//  4. Вынести типы entity в отдельную папку
//  5. Разобраться с UsePipes
//  6. Создать декоратор @CurrentUser
//  7. Поправить модули, соблюдать порядок инициализации imports, exports, providers, controllers
//  8. app.module в отдельную папку

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,

    private readonly jwtService: JwtService,
  ) {}

  // 1 <-> 2 <-> 3
  // 1 <-> 2 : 1. Request, 2. Response. FR_RQ, FR_RS
  // 2 <-> 3 : 1. Request, 2. Response. PG_RQ, PG_RS
  // 2 <-> 4 : 1. Request, 2. Response. CH_RQ, CH_RS
  // 2 <-> 5 : 1. Request, 2. Response. RD_RQ, RD_RS

  /**
   * Метод сервиса для создания нового пользователя в БД
   */
  async createUser(userBody: CreateUser_FR_RQ) {
    const hashPassword = await hash(userBody.password, Number(process.env.PASSWORD_SALT));

    type User_PG_RS = {
      email: string;
      id: string;
      created_at: Date;
      updated_at: Date
    }

    return this.knex<UserEntity>('user').insert({ email: userBody.email, password: hashPassword }).returning<User_PG_RS>('email, id, created_at, updated_at').first();
  }

  /**
   * Метод сервиса для поиска юзера в БД
   */
  async findUser(email: string): Promise<UserEntity> {
    return this.knex<UserEntity>('user').select('*').where({ email }).first();
  }

  /**
   * Метод сервиса для валидации юзера в БД
   */
  async validateUser(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    // Валидация пароля
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(BAD_PASSWORD);
    }

    return this.login(user.id, user.password);
  }

  /**
   * Метод выдачи токена / аутентификация
   */
  async login(id: string, password: string) {
    const payload = { id, password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  /**
   * Метод валидация токена, проверка прав доступа / авторизация
   */
  async validateToken(token: string) {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      console.error('Error verifying token:');
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
