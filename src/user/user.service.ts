import * as dotenv from 'dotenv';
import { hash } from 'bcryptjs';
import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { UserEntity } from 'src/lib/types/user.entity';
import { User_FR_RQ } from 'src/dto/dto-request/user-fr-request';
import { User_PG_RS } from 'src/dto/dto-response/user-pg-response';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../type-orm-db/entities/user.entity';
import { Repository } from 'typeorm';

dotenv.config();
//Для использования .env файл`ов

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userTypeORM: Repository<User>,

    @InjectConnection()
    private readonly knex: Knex,
  ) {}

  createUser = async (userBody: User_FR_RQ) => {
    const hashPassword = await hash(userBody.password, Number(process.env.PASSWORD_SALT));

    const query = await this.userTypeORM
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({
        email: userBody.email,
        password: hashPassword,
      })
      .returning(['id', 'email', 'created_at', 'updated_at'])
      .execute();

    const [user] = query.raw;

    return user;
  };

  /**
   * Метод сервиса для создания нового пользователя в БД (arrow function)
   */
  // createUser = async (userBody: User_FR_RQ) => {
  //   const hashPassword = await hash(userBody.password, Number(process.env.PASSWORD_SALT));

  //   // При использовании вставки данных (insert()), отсутствует поддержка first(), поддерживается только в выборках данных;
  //   const [user] = await this.knex<UserEntity>('user')
  //     .insert({ email: userBody.email, password: hashPassword })
  //     .returning<User_PG_RS[]>(['email', 'id', 'created_at', 'updated_at']);

  //   return user;
  // };

  /**
   * Метод сервиса для поиска юзера в БД (arrow function)
   */

  findUser = async (email: string) => {
    return this.knex<UserEntity>('user').select('*').where({ email }).first();
  };
}
