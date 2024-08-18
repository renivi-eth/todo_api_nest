import { Knex } from 'knex';
import { TaskDto } from './dto/task.dto';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex<UserEntity>,
  ) {}

  /**
   * Метод Task сервиса для получения всех задач из БД
   */
  async getAllTask(user_id: string) {
    const getAllUserTask = await this.knex.table('task').select('*').where({ user_id: user_id }).returning('*');
    return getAllUserTask;
  }

  /**
   * Метод Task сервиса для создании задачи в БД
   */
  async createTask(TaskDto: TaskDto, userID: string): Promise<Partial<TaskEntity>> {
    const taskWithUserId = { ...TaskDto, user_id: userID };

    return this.knex
      .table('task')
      .insert(taskWithUserId as Partial<TaskEntity>)
      .returning('*')
      .first();
  }
}
