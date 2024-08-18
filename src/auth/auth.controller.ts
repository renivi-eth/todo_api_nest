import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERROR } from 'src/lib/variables/exception-error';
import { BadRequestException, Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST регистрация пользователя;
   */
  @Post('registration')
  async registration(@Body() CreateUserDto: CreateUserDto) {
    const findUser = await this.authService.findUser(CreateUserDto.email);

    if (findUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(CreateUserDto);
  }

  /**
   * POST авторизация пользователя;
   */
  @HttpCode(200)
  @Post('login')
  async login(@Body() CreateUserDto: CreateUserDto) {
    const JWT_token = await this.authService.validateUser(CreateUserDto.email, CreateUserDto.password);
    return JWT_token;
  }
}
