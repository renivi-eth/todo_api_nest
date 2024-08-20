import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [],
  // Экспортируем сервис, для работы сервиса в других модулях
  exports: [UserService],

  providers: [UserService],

  controllers: [],
})
export class UserModule {}
