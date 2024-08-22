import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task_FR_RQ } from '../dto/task.fr.request';
import { TaskService } from './task.service';

//TODO: разобраться с request: any (типизация any не подходит) и с модулем (прям детально пойми откуда берется AuthGuard)

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getUserTasks(@Req() request: any) {
    // Вытаскиваем user_id
    const user_id = request.decodedData.id;

    return this.taskService.getAllTask(user_id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createTask(@Body() TaskDto: Task_FR_RQ, @Req() request: any) {
    return this.taskService.createTask(TaskDto, request.decodedData.id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateTask(@Body() TaskDto: Task_FR_RQ, @Param() task_id: { id: string }, @Req() request: any) {
    // Деструктурируем и получаем id строкой
    const { id } = task_id;

    return this.taskService.updateTask(TaskDto, id, request.decodedData.id);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async deleteTask(@Param() task_id: { id: string }, @Req() request: any) {
    const { id } = task_id;

    return this.taskService.deleteTask(id, request.decodedData.id);
  }
}
