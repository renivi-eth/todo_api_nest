import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class AuthService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async createUser(dto: AuthDto) {
    const createUser = await this.knex
      .table('user')
      .insert({ email: dto.email, password: dto.password })
      .returning('*');

    return createUser;
  }

  async findUser(email: string) {}
}
