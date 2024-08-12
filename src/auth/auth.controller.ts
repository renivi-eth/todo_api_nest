import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('registration')
  async registration(@Body() dto: AuthDto) {}

  // 200 код, ничего не создаем
  @HttpCode(200)
  @Post('auth')
  async login(@Body() dto: AuthDto) {}
}
