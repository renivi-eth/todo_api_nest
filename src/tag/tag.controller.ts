import { TagService } from './tag.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Tag_FR_RQ } from 'src/dto/tag.fr.request';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TagsQueryEntity } from 'src/lib/types/tag.query.entity';
import { TagTaskEntity } from 'src/lib/types/tag.task.entity';

@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getUserTags(@Req() request: any, @Query() query: TagsQueryEntity) {
    const user_id = request.decodedData.id;

    return this.tagService.getAllTag(user_id, query);
  }

  @Get(':id')
  async getUserTagById(@Param() tag_id: { id: string }, @Req() request: any) {
    const { id } = tag_id;

    return this.tagService.getTagById(id, request.decodedData.id);
  }

  @Post()
  async createTag(@Body() tagDto: Tag_FR_RQ, @Req() request: any) {
    return this.tagService.createTag(tagDto, request.decodedData.id);
  }

  @Put(':id')
  async updateTag(@Body() tagDto: Tag_FR_RQ, @Param() tag_id: { id: string }, @Req() request: any) {
    const { id } = tag_id;

    return this.tagService.updateTag(tagDto, id, request.decodedData.id);
  }

  @Delete(':id')
  async deleteTag(@Param() tag_id: { id: string }, @Req() request: any) {
    const { id } = tag_id;

    return this.tagService.deleteTag(id, request.decodedData.id);
  }

  /**
   * Связь тэга с задачей
   */
  @Post(':tagId/task/:taskId')
  async tagTaskRelation(@Param() param: TagTaskEntity, @Req() request: any) {
    const task_id = param.taskId;
    const tag_id = param.tagId;

    return this.tagService.createRelationTagTask(tag_id, task_id, request.decodedData.id);
  }
}
