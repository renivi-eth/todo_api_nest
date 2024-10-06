import { TaskService } from './task.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CurrentUserId } from 'src/lib/decorators/current-user-id';
import { TaskIdParam } from 'src/lib/dto/dto-request/task-id-request';
import { Task_FR_RQ } from '../../lib/dto/dto-request/task-fr-request';
import { Task_PG_RS } from '../../lib/dto/dto-response/task-pg-response';
import { BadResponse } from 'src/lib/decorators/common-invalid-response-swagger';
import { TaskQueryDTO } from 'src/lib/dto/dto-query-param-request/task-query-request';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Получить все задачи
   */
  // Swagger
  @ApiOperation({
    summary: 'Get all user tasks with Query params',
    description: 'Get all user task with Query Param - limit, state, sort property, sort direction',
  })
  @ApiResponse({ status: 200, type: Task_PG_RS })
  @BadResponse()
  @Get()
  async getUserTasks(@CurrentUserId() userId: string, @Query() query: TaskQueryDTO) {
    return this.taskService.getAllTask(userId, query);
  }

  /**
   * Получить все задачу по id
   */
  // Swagger
  @ApiOperation({
    summary: 'Get task by id (UUID)',
    description: 'Get task by id (UUID)',
  })
  @ApiResponse({ status: 200, type: Task_PG_RS })
  @BadResponse()
  @Get(':taskId')
  async getUserTaskById(@Param('taskId') taskId: TaskIdParam, @CurrentUserId() userId: string) {
    return this.taskService.getTaskById(taskId, userId);
  }

  /**
   * Создать задачу
   */
  // Swagger
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Create a new task',
  })
  @ApiCreatedResponse({ description: 'Task successfully created', type: Task_PG_RS })
  @BadResponse()
  @Post()
  async createTask(@Body() taskDto: Task_FR_RQ, @CurrentUserId() userId: string) {
    return this.taskService.createTask(taskDto, userId);
  }

  /**
   * Изменить задачу по id
   */
  // Swagger
  @ApiOperation({
    summary: 'Change task',
    description: 'Change a user task by ID (UUID)',
  })
  @ApiResponse({ status: 200, description: 'Task successfully changed', type: Task_PG_RS })
  @BadResponse()
  @Put(':taskId')
  async updateTask(@Body() taskDto: Task_FR_RQ, @Param('taskId') taskId: string, @CurrentUserId() userId: string) {
    return this.taskService.updateTask(taskDto, taskId, userId);
  }

  /**
   * Удалить задачу по id
   */
  // Swagger
  @ApiOperation({
    summary: 'Delete task',
    description: 'Delete task by ID (UUID)',
  })
  @ApiResponse({ status: 200, description: 'Task successfully deleted', type: Task_PG_RS })
  @BadResponse()
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: TaskIdParam, @CurrentUserId() userId: string) {
    return this.taskService.deleteTask(taskId, userId);
  }
}
