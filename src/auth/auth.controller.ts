import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() dto: AuthDto) {
    return this.authService.createUser(dto);
  }

  // 200 код, ничего не создаем
  @HttpCode(200)
  @Post('auth')
  async login(@Body() dto: AuthDto) {}
}
