import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { User_FR_RQ } from '../../lib/dto/dto-request/user-fr-request';
import { User_PG_RS } from '../../lib/dto/dto-response/user-pg-response';
import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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
  // Swagger
  @ApiOperation({ summary: 'Registration for new User', description: 'Create a new user account with E-mail and Password' })
  @ApiBody({ type: User_FR_RQ, description: 'User registration body' })
  @ApiCreatedResponse({ description: 'User successfully registered', type: User_PG_RS })
  @ApiResponse({ status: 400, description: 'User with this Email already registered' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  // Registration
  @Post('registration')
  async registration(@Body() createUserDto: User_FR_RQ): Promise<User_PG_RS> {
    const user = await this.userService.findUser(createUserDto.email);

    if (user) {
      throw new BadRequestException(ExceptionError.ALREADY_REGISTERED_ERROR);
    }

    return this.userService.createUser(createUserDto);
  }

  /**
   * Авторизация пользователя
   */
  // Swagger
  @ApiOperation({ summary: 'User Login', description: 'Authenticate User and return a Bearer token' })
  @ApiBody({ type: User_FR_RQ, description: 'User login data' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
    description: 'Get access_token',
  })
  @ApiResponse({ status: 401, description: 'User not found or Password is wrong' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  // Login
  @Post('login')
  async login(@Body() CreateUserDto: User_FR_RQ) {
    return this.authService.validateUser(CreateUserDto.email, CreateUserDto.password);
  }
}
