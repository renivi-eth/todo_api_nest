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

  /**
   * Метод сервиса для создания нового пользователя в БД
   */
  async createUser(dto: CreateUserDto): Promise<Omit<UserResponseDto, 'password'>> {
    const hashPassword = await hash(dto.password, Number(process.env.PASSWORD_SALT));

    const [newUser]: UserEntity[] = await this.knex.table('user').insert({ email: dto.email, password: hashPassword }).returning('*');

    const { password, id, ...UserWithoutPassword } = newUser;
    return UserWithoutPassword;
  }

  /**
   * Метод сервиса для поиска юзера в БД
   */
  async findUser(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.knex.table('user').select('*').where({ email }).first();

    return user;
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
