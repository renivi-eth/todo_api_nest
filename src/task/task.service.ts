import { Knex } from 'knex';
import { TaskDto } from './dto/task.dto';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { TaskEntity } from './entity/task.entity';
import { TaskState } from 'src/lib/variables/task.state';

@Injectable()
export class TaskService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex<UserEntity>,
  ) {}

  /**
   * Метод Task сервиса для получения всех задач из БД
   */
  async getAllTask(user_id: string): Promise<TaskEntity[]> {
    const getAllUserTask: TaskEntity[] = await this.knex.table('user').select('*').where({ user_id: user_id });
    return getAllUserTask;
  }

  /**
   * Метод Task сервиса для создании задачи в БД
   */
  async createTask(TaskDto: TaskDto, userID: string): Promise<Partial<TaskEntity>> {
    const taskWithUserId = { ...TaskDto, user_id: userID };

    const [newTask] = await this.knex
      .table('task')
      .insert(taskWithUserId as Partial<TaskEntity>)
      .returning('*');

    return newTask;
  }
}
