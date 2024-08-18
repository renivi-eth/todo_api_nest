import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';
import { ALREADY_REGISTERED_ERROR } from 'src/lib/variables/exception-error';
import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST регистрация пользователя;
   */
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() сreateUserDto: CreateUserDto) {
    const findUser = await this.authService.findUser(сreateUserDto.email);

    if (findUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(сreateUserDto);
  }

  /**
   * POST авторизация пользователя;
   */
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() CreateUserDto: CreateUserDto) {
    const JWT_token = await this.authService.validateUser(CreateUserDto.email, CreateUserDto.password);
    return JWT_token;
  }
}
