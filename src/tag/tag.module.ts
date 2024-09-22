import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Tag } from 'src/lib/entities/tag.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Tag])],

  exports: [],

  providers: [TagService],

  controllers: [TagController],
})
export class TagModule {}
