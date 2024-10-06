import { TagService } from './tag.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Tag_FR_RQ } from 'src/lib/dto/dto-request/tag-fr-request';
import { CurrentUserId } from 'src/lib/decorators/current-user-id';
import { Tag_PG_RS } from 'src/lib/dto/dto-response/tag-pg-response';
import { TagTask_FR_RQ } from 'src/lib/dto/dto-request/tag-task-fr-request';
import { Task_Tag_PG_RS } from 'src/lib/dto/dto-response/task-tag-pg-response';
import { BadResponse } from 'src/lib/decorators/common-invalid-response-swagger';
import { TagsQueryDTO } from 'src/lib/dto/dto-query-param-request/tag-query-request';
import { TaskTagBadResponse } from 'src/lib/decorators/task-tag-relation-invalid-response-swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  /**
   * Получить все тэги
   */
  // Swagger
  @ApiOperation({
    summary: 'Get all user tasks with Query params',
    description: 'Get all user task with Query Param - limit, state, sort property, sort direction',
  })
  @ApiResponse({ status: 200, type: Tag_PG_RS })
  @BadResponse()
  @Get()
  async getUserTags(@CurrentUserId() userId: string, @Query() query: TagsQueryDTO) {
    return this.tagService.getAllTag(userId, query);
  }

  /**
   * Cоздать тэг
   */
  // Swagger
  @ApiOperation({
    summary: 'Create a new tag',
    description: 'Create a new tag with name',
  })
  @ApiCreatedResponse({ status: 200, type: Tag_PG_RS })
  @ApiBody({ type: Tag_FR_RQ, description: 'Tag create body' })
  @BadResponse()
  @Post()
  async createTag(@Body() tagDto: Tag_FR_RQ, @CurrentUserId() userId: string) {
    return this.tagService.createTag(tagDto, userId);
  }

  /**
   * Получить тэг по id
   */
  // Swagger
  @ApiOperation({
    summary: 'Get tag by id (UUID)',
    description: 'Get tag by id (UUID) by path param',
  })
  @ApiResponse({ status: 200, type: Tag_PG_RS })
  @BadResponse()
  @Get(':tagId')
  async getUserTagById(@Param('tagId') tagId: string, @CurrentUserId() userId: string) {
    return this.tagService.getTagById(tagId, userId);
  }

  /**
   * Изменить тэг по id
   */
  // Swagger
  @ApiOperation({
    summary: 'Сhange tag',
    description: 'Change a user tag by ID (UUID)',
  })
  @ApiResponse({ status: 200, description: 'Tag successfully changed', type: Tag_PG_RS })
  @BadResponse()
  @Put(':tagId')
  async updateTag(@Body() tagDto: Tag_FR_RQ, @Param('tagId') tagId: string, @CurrentUserId() userId: string) {
    return this.tagService.updateTag(tagDto, tagId, userId);
  }

  /**
   * Удалить тэг по id
   */
  // Swagger
  @ApiOperation({
    summary: 'Delete task',
    description: 'Delete tag by ID (UUID)',
  })
  @ApiResponse({ status: 200, description: 'Tag successfully deleted', type: Tag_PG_RS })
  @BadResponse()
  @Delete(':tagId')
  async deleteTag(@Param('tagId') tagId: string, @CurrentUserId() userId: string) {
    return this.tagService.deleteTag(tagId, userId);
  }

  /**
   * Связать тэг с задачей
   */
  // Swagger
  @ApiOperation({
    summary: 'Create relation between tag and task',
  })
  @ApiCreatedResponse({ status: 201, description: 'Relation successfully created', type: Task_Tag_PG_RS })
  @TaskTagBadResponse()
  @Post(':tagId/task/:taskId')
  async tagTaskRelation(@Param() { taskId, tagId }: TagTask_FR_RQ, @CurrentUserId() userId: string) {
    return this.tagService.createRelationTagTask(tagId, taskId, userId);
  }
}
