import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
  // Используем модульный подход
  imports: [TypeOrmModule.forFeature([User])],
  // Экспортируем сервис, для работы сервиса в других модулях
  exports: [UserService],

  providers: [UserService],

  controllers: [],
})
export class UserModule {}
