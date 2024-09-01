import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Task_FR_RQ } from '../dto/task-fr-request';
import { TaskEntity } from '../lib/types/task.entity';
import { Task_PG_RS } from 'src/dto/task-pg-pesponse';
import { TaskQuery } from 'src/lib/types/task-query';

@Injectable()
export class TaskService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
  ) {}

  /**
   * Метод Task сервиса для получения всех задач из БД
   */
  getAllTask = async (userId: string, query: TaskQuery = {}) => {
    const { limit, state, sortProperty, sortDirection } = query;

    let queryBuilder = this.knex.table<TaskEntity>('task').where({ user_id: userId });

    if (limit) {
      queryBuilder.limit(parseInt(limit));
    }

    if (state) {
      queryBuilder.where({ state });
    }

    if (sortProperty) {
      queryBuilder.orderBy(sortProperty, sortDirection || 'ASC');
    }

    const tasks = await queryBuilder.select('*').returning<Task_PG_RS>('*');

    return tasks;
  };

  /**
   * Метод Task сервиса для получения всех задач из БД по ID
   */
  getTaskById = async (id: string, userId: string) => {
    const [TaskById] = await this.knex<TaskEntity>('task').select('*').where({ id, user_id: userId }).returning<Task_PG_RS[]>('*');

    return TaskById;
  };

  /**
   * Метод Task сервиса для создания задачи в БД
   */
  createTask = async (taskDto: Task_FR_RQ, userId: string) => {
    const taskWithUserId = { ...taskDto, user_id: userId };

    const [newTask] = await this.knex<TaskEntity>('task')
      .insert(taskWithUserId as Partial<TaskEntity>)
      .returning<Task_PG_RS[]>('*');

    return newTask;
  };

  /**
   * Метод Task сервиса для обновления задачи в БД
   */
  updateTask = async (taskDto: Task_FR_RQ, task_id: string, userId: string) => {
    const [updatedTask] = await this.knex<TaskEntity>('task')
      .where({ id: task_id, user_id: userId })
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
  deleteTask = async (task_id: string, userId: string) => {
    const [deletedTask] = await this.knex<TaskEntity>('task').where({ id: task_id, user_id: userId }).del().returning<Task_PG_RS[]>('*');

    return deletedTask;
  };
}
