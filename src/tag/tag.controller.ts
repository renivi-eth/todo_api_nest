import { TagService } from './tag.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Tag_FR_RQ } from 'src/dto/tag.fr.request';
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getUserTags(@Req() request: any) {
    // Вытаскиваем user_id
    const user_id = request.decodedData.id;

    return this.tagService.getAllTag(user_id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createTag(@Body() tagDto: Tag_FR_RQ, @Req() request: any) {
    return this.tagService.createTag(tagDto, request.decodedData.id);
  }
}
