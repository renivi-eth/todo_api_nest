import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';
import { User_FR_RQ } from '../../lib/dto/dto-request/user-fr-request';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';

import { User_PG_RS } from '../../lib/dto/dto-response/user-pg-response';

import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Регистрация пользователя
   */

  @Post('registration')
  @ApiResponse({ status: 201, description: 'User was create successfull.' })
  @ApiResponse({ status: 400, description: 'User with this Email already registered' })
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
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() CreateUserDto: User_FR_RQ) {
    return this.authService.validateUser(CreateUserDto.email, CreateUserDto.password);
  }
}
