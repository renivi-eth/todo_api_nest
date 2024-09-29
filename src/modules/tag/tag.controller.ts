import { TagService } from './tag.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Tag_FR_RQ } from 'src/lib/dto/dto-request/tag-fr-request';
import { CurrentUserId } from 'src/lib/decorators/current-user-id';
import { TagTask_FR_RQ } from 'src/lib/dto/dto-request/tag-task-fr-request';
import { TagsQueryDTO } from 'src/lib/dto/dto-query-param-request/tag-query-request';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getUserTags(@CurrentUserId() userId: string, @Query() query: TagsQueryDTO) {
    return this.tagService.getAllTag(userId, query);
  }

  @Post()
  async createTag(@Body() tagDto: Tag_FR_RQ, @CurrentUserId() userId: string) {
    return this.tagService.createTag(tagDto, userId);
  }

  @Get(':tagId')
  async getUserTagById(@Param('tagId') tagId: string, @CurrentUserId() userId: string) {
    return this.tagService.getTagById(tagId, userId);
  }

  @Put(':tagId')
  async updateTag(@Body() tagDto: Tag_FR_RQ, @Param('tagId') tagId: string, @CurrentUserId() userId: string) {
    return this.tagService.updateTag(tagDto, tagId, userId);
  }

  @Delete(':tagId')
  async deleteTag(@Param('tagId') tagId: string, @CurrentUserId() userId: string) {
    return this.tagService.deleteTag(tagId, userId);
  }

  /**
   * Связь тэга с задачей
   */
  @Post(':tagId/task/:taskId')
  async tagTaskRelation(@Param() { taskId, tagId }: TagTask_FR_RQ, @CurrentUserId() userId: string) {
    return this.tagService.createRelationTagTask(tagId, taskId, userId);
  }
}
