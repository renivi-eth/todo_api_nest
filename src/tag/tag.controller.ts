import { TagService } from './tag.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Tag_FR_RQ } from 'src/dto/tag-fr-request';
import { TagTaskEntity } from 'src/lib/types/tag-task-entity';
import { TagsQueryEntity } from 'src/lib/types/tag-query-entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

// TODO: Написать декоратор @User вместо использования @Req
//   Вытаскивать параметры, как в createTag (@Param('tagId') tagId: string)

@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getUserTags(@Req() request: any, @Query() query: TagsQueryEntity) {
    const user_id = request.decodedData.id;

    return this.tagService.getAllTag(user_id, query);
  }

  @Post()
  async createTag(@Body() tagDto: Tag_FR_RQ, @Req() request: any) {
    return this.tagService.createTag(tagDto, request.decodedData.id);
  }

  @Get(':tagId')
  async getUserTagById(@Param('tagId') tagId: string, @Req() request: any) {
    return this.tagService.getTagById(tagId, request.decodedData.id);
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
  async tagTaskRelation(@Param() { taskId, tagId }: TagTaskEntity, @Req() request: any) {
    return this.tagService.createRelationTagTask(tagId, taskId, request.decodedData.id);
  }
}
