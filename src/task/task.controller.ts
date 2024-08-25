import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task_FR_RQ } from '../dto/task.fr.request';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryEntity } from 'src/lib/types/query.entity';

//TODO: разобраться с request: any (типизация any не подходит) и с модулем (прям детально пойми откуда берется AuthGuard)
//TODO: фильтрация, сортировка, лимит

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getUserTasks(@Req() request: any, @Query() query: QueryEntity) {
    // Вытаскиваем user_id
    const user_id = request.decodedData.id;

    return this.taskService.getAllTask(user_id);
  }

  @Get(':id')
  async getUserTaskById(@Param() task_id: { id: string }, @Req() request: any) {
    // Деструктурируем id из param {id: string} и получаем id строкой
    const { id } = task_id;

    return this.taskService.getTaskById(id, request.decodedData.id);
  }

  @Post()
  async createTask(@Body() taskDto: Task_FR_RQ, @Req() request: any) {
    return this.taskService.createTask(taskDto, request.decodedData.id);
  }

  @Put(':id')
  async updateTask(@Body() taskDto: Task_FR_RQ, @Param() task_id: { id: string }, @Req() request: any) {
    const { id } = task_id;

    return this.taskService.updateTask(taskDto, id, request.decodedData.id);
  }

  @Delete(':id')
  async deleteTask(@Param() task_id: { id: string }, @Req() request: any) {
    const { id } = task_id;

    return this.taskService.deleteTask(id, request.decodedData.id);
  }
}
