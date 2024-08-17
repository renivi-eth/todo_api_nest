import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// TODO: исправить секрет;
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'my-32-character-ultra-secure-and-ultra-long-secret',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
