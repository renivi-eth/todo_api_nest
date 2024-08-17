import { Knex } from 'knex';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto, UserResponseDto } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BAD_PASSWORD, USER_NOT_FOUND } from 'src/lib/variables/exception-error';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<Omit<UserResponseDto, 'password'>> {
    /**
     * Функция хэширования пароля
     */
    const hashPassword = await hash(dto.password, Number(process.env.PASSWORD_SALT));

    const [newUser] = await this.knex
      .table('user')
      .insert({ email: dto.email, password: hashPassword })
      .returning('*');

    const { password, id, ...UserWithoutPassword } = newUser;
    return UserWithoutPassword;
  }

  async findUser(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.knex.table('user').select('*').where({ email }).first();
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const findUser = await this.findUser(email);

    if (!findUser) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const isValidPassword = await compare(password, findUser.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(BAD_PASSWORD);
    }
    console.log(findUser);
    return this.login(findUser.email, findUser.password);
  }

  async login(email: string, password: string) {
    const payload = { email, password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
