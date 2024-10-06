import { TaskService } from './task.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CurrentUserId } from 'src/lib/decorators/current-user-id';
import { TaskIdParam } from 'src/lib/dto/dto-request/task-id-request';
import { Task_FR_RQ } from '../../lib/dto/dto-request/task-fr-request';
import { BadResponse } from 'src/lib/swagger/common-invalid-response-swagger';
import { Task_PG_RS } from '../../lib/dto/dto-response/task-pg-response';
import { TaskQueryDTO } from 'src/lib/dto/dto-query-param-request/task-query-request';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
