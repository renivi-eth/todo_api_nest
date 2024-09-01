import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task_FR_RQ } from '../dto/dto-request/task-fr-request';
import { TaskQueryDTO } from 'src/dto/dto-query-param-request/task-query-request';
import { CurrentUser } from 'src/lib/decorators/current-user';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getUserTasks(@CurrentUser() userId: string, @Query() query: TaskQueryDTO) {
    return this.taskService.getAllTask(userId, query);
  }

  @Get(':taskId')
  async getUserTaskById(@Param('taskId') taskId: string, @CurrentUser() userId: string) {
    return this.taskService.getTaskById(taskId, userId);
  }

  @Post()
  async createTask(@Body() taskDto: Task_FR_RQ, @CurrentUser() userId: string) {
    return this.taskService.createTask(taskDto, userId);
  }

  @Put(':taskId')
  async updateTask(@Body() taskDto: Task_FR_RQ, @Param('taskId') taskId: string, @CurrentUser() userId: string) {
    return this.taskService.updateTask(taskDto, taskId, userId);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string, @CurrentUser() userId: string) {
    return this.taskService.deleteTask(taskId, userId);
  }
}
