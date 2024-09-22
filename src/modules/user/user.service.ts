import { hash } from 'bcryptjs';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { User_FR_RQ } from 'src/lib/dto/dto-request/user-fr-request';
import { User_PG_RS } from 'src/lib/dto/dto-response/user-pg-response';

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /** Создание нового пользователя */
  createUser = async (userBody: User_FR_RQ) => {
    const hashPassword = await hash(userBody.password, Number(process.env.PASSWORD_SALT));

    const query = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({
        email: userBody.email,
        password: hashPassword,
      })
      .returning(['id', 'email', 'created_at'])
      .execute();

    const [user]: User_PG_RS[] = query.raw;

    return user;
  };

  /**
   * Метод сервиса для поиска юзера в БД (arrow function)
   */
  findUser = async (email: string): Promise<User | null> => {
    const user = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.created_at', 'user.password'])
      .where('user.email = :email', { email: email })
      .getOne();

    return user;
  };
}
