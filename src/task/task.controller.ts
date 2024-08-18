import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Get()
  async getUserTasks(@Req() request: any) {
    const userID = request.decodedData.id;

    return this.taskService.getAllTask(userID);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createTask(@Body() TaskDto: TaskDto, @Req() request: any) {
    return this.taskService.createTask(TaskDto, request.decodedData.id);
  }
}
