import { AuthService } from './auth.service';
import { CreateUser_FR_RQ } from './dto/auth.dto';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Регистрация пользователя
   */
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() createUserDto: CreateUser_FR_RQ) {
    const user = await this.authService.findUser(createUserDto.email);

    if (user) {
      throw new BadRequestException(ExceptionError.ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(createUserDto);
  }

  /**
   * Авторизация пользователя
   */
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() CreateUserDto: CreateUser_FR_RQ) {
    return this.authService.validateUser(CreateUserDto.email, CreateUserDto.password);
  }
}
