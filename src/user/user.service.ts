import { Knex } from 'knex';
import { hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { User_FR_RQ } from 'src/dto/user.fr.request';
import { User_PG_RS } from 'src/dto/user.pg.response';
import { UserEntity } from 'src/lib/types/user.entity';

import * as dotenv from 'dotenv';
//Для использования .env файлов
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
  ) {}
  /**
   * Метод сервиса для создания нового пользователя в БД (arrow function)
   */
  createUser = async (userBody: User_FR_RQ) => {
    const hashPassword = await hash(userBody.password, Number(process.env.PASSWORD_SALT));

    // При использовании вставки данных (insert()), отсутствует поддержка first(), поддерживается только в выборках данных;
    const [newUser] = await this.knex<UserEntity>('user')
      .insert({ email: userBody.email, password: hashPassword })
      .returning<User_PG_RS[]>(['email', 'id', 'created_at', 'updated_at']);

    console.log(newUser);
    return newUser;
  };

  /**
   * Метод сервиса для поиска юзера в БД (arrow function)
   */
  findUser = async (email: string) => {
    return this.knex<UserEntity>('user').select('*').where({ email }).first();
  };
}
