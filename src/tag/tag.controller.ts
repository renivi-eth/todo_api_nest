import { TagService } from './tag.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TagTaskEntity } from 'src/lib/types/tag-task-entity';
import { Tag_FR_RQ } from 'src/dto/dto-request/tag-fr-request';
import { CurrentUserId } from 'src/lib/decorators/current-user-id';
import { TagsQueryDTO } from 'src/dto/dto-query-param-request/tag-query-request';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

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
  async tagTaskRelation(@Param() { taskId, tagId }: TagTaskEntity, @CurrentUserId() userId: string) {
    return this.tagService.createRelationTagTask(tagId, taskId, userId);
  }
}
