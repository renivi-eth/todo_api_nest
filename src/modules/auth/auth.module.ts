import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,

      secret: process.env.SECRET_JWT,

      signOptions: { expiresIn: process.env.LIFETIME_TOKEN_HOURS },
    }),
    UserModule,
  ],

  // TODO: зачем весь сервис?
  exports: [AuthService],

  providers: [AuthService, AuthGuard],

  controllers: [AuthController],
})
export class AuthModule {}
