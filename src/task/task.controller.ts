import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Get()
  async getUserTasks(@Req() request: any) {
    const userID = request.decodedData.id;
    console.log(userID);

    return this.TaskService.getAllTask(userID);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async createTask(@Body() TaskDto: TaskDto, @Req() request: any) {
    return this.TaskService.createTask(TaskDto, request.decodedData.id);
  }
}
