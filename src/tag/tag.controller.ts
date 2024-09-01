import { TagService } from './tag.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Tag_FR_RQ } from 'src/dto/tag-fr-request';
import { TagTaskEntity } from 'src/lib/types/tag-task-entity';
import { TagsQueryEntity } from 'src/lib/types/tag-query-entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/lib/decorators/current-user';

// TODO: Написать декоратор @User вместо использования @Req
//   Вытаскивать параметры, как в createTag (@Param('tagId') tagId: string)

// TODO: заменить все на @CurrentUser()

@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getUserTags(@CurrentUser() id: string, @Query() query: TagsQueryEntity) {
    return this.tagService.getAllTag(id, query);
  }

  @Post()
  async createTag(@Body() tagDto: Tag_FR_RQ, @Req() request: any) {
    return this.tagService.createTag(tagDto, request.decodedData.id);
  }

  @Get(':tagId')
  async getUserTagById(@Param('tagId') tagId: string, @Req() request: any) {
    return this.tagService.getTagById(tagId, request.decodedData.id);
  }

  @Put(':tagId')
  async updateTag(@Body() tagDto: Tag_FR_RQ, @Param('tagId') tagId: string, @Req() request: any) {
    return this.tagService.updateTag(tagDto, tagId, request.decodedData.id);
  }

  @Delete(':tagId')
  async deleteTag(@Param('tagId') tagId: string, @Req() request: any) {
    return this.tagService.deleteTag(tagId, request.decodedData.id);
  }

  /**
   * Связь тэга с задачей
   */
  // TODO: PARAM
  @Post(':tagId/task/:taskId')
  async tagTaskRelation(@Param() { taskId, tagId }: TagTaskEntity, @Req() request: any) {
    return this.tagService.createRelationTagTask(tagId, taskId, request.decodedData.id);
  }
}
