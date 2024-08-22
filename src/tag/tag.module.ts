import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],

  exports: [],

  providers: [TagService],

  controllers: [TagController],
})
export class TagModule {}
