import { AuthService } from './auth.service';
import { User_FR_RQ } from '../dto/user.fr.request';
import { UserService } from 'src/user/user.service';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Регистрация пользователя
   */
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() createUserDto: User_FR_RQ) {
    const user = await this.userService.findUser(createUserDto.email);

    if (user) {
      throw new BadRequestException(ExceptionError.ALREADY_REGISTERED_ERROR);
    }

    return this.userService.createUser(createUserDto);
  }

  /**
   * Авторизация пользователя
   */
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() CreateUserDto: User_FR_RQ) {
    return this.authService.validateUser(CreateUserDto.email, CreateUserDto.password);
  }
}
