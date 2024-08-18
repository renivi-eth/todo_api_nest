import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Get()
  async getUserTasks(@Req() request: any) {
    const userId = request.DecodedData.id;
    return this.TaskService.getAllTask(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() TaskDto: TaskDto, @Req() request: any) {
    return this.TaskService.createTask(TaskDto, request.decodedData.id);
  }
}
