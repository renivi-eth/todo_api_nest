import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmDbModule } from 'src/type-orm-db/type-orm-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/type-orm-db/entities/user.entity';

@Module({
  // https://stackoverflow.com/questions/66371656/difference-forroot-and-forfeature-nest-js
  imports: [TypeOrmModule.forFeature([User])],
  // Экспортируем сервис, для работы сервиса в других модулях
  exports: [UserService],

  providers: [UserService],

  controllers: [],
})
export class UserModule {}
