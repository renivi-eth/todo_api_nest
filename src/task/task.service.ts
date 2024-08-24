import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Task_FR_RQ } from '../dto/task.fr.request';
import { TaskEntity } from '../lib/types/task.entity';
import { Task_PG_RS } from 'src/dto/task.pg.pesponse';

@Injectable()
export class TaskService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
  ) {}

  /**
   * Метод Task сервиса для получения всех задач из БД
   */
  getAllTask = async (user_id: string) => {
    // TODO: limit, sort, direction
    const getAllUserTask = await this.knex.table<TaskEntity>('task').select('*').where({ user_id: user_id }).returning<Task_PG_RS>('*');

    return getAllUserTask;
  };

  /**
   * Метод Task сервиса для получения всех задач из БД по ID
   */
  getTaskById = async (id: string, user_id: string) => {
    const [TaskById] = await this.knex<TaskEntity>('task').select('*').where({ id, user_id }).returning<Task_PG_RS[]>('*');

    return TaskById;
  };

  /**
   * Метод Task сервиса для создании задачи в БД
   */
  createTask = async (taskDto: Task_FR_RQ, user_id: string) => {
    const taskWithUserId = { ...taskDto, user_id: user_id };

    const [newTask] = await this.knex<TaskEntity>('task')
      .insert(taskWithUserId as Partial<TaskEntity>)
      .returning<Task_PG_RS[]>('*');

    return newTask;
  };

  /**
   * Метод Task сервиса для обновлении задачи в БД
   */
  updateTask = async (taskDto: Task_FR_RQ, task_id: string, user_id: string) => {
    const [updatedTask] = await this.knex<TaskEntity>('task')
      .where({ id: task_id, user_id: user_id })
      .update({
        name: taskDto.name,
        description: taskDto.description,
        state: taskDto.state,
        updated_at: this.knex.fn.now(),
      })
      .returning<Task_PG_RS[]>('*');

    return updatedTask;
  };

  /**
   * Метод Task сервиса для удаление задачи из БД по ID задачи
   */
  deleteTask = async (task_id: string, user_id: string) => {
    const [deletedTask] = await this.knex<TaskEntity>('task').where({ id: task_id, user_id: user_id }).del().returning<Task_PG_RS[]>('*');

    return deletedTask;
  };
}
