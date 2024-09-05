import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmDbModule } from 'src/type-orm-db/type-orm-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DatabaseModule,

    TypeOrmDbModule,

    AuthModule,

    TaskModule,

    TagModule,
  ],

  exports: [],

  providers: [],

  controllers: [],
})
export class AppModule {}
