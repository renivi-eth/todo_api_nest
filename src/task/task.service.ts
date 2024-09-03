import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { TaskEntity } from '../lib/types/task.entity';
import { SortDirection } from '../lib/variables/sort-direction';
import { Task_FR_RQ } from '../dto/dto-request/task-fr-request';
import { Task_PG_RS } from 'src/dto/dto-response/task-pg-response';
import { TaskQueryDTO } from 'src/dto/dto-query-param-request/task-query-request';

@Injectable()
export class TaskService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
  ) {}

  /**
   * Получение task по фильтрам
   */
  getAllTask = async (userId: string, query: TaskQueryDTO) => {
    const { limit, state, sortProperty, sortDirection } = query;

    const queryBuilder = this.knex.table<TaskEntity>('task').where({ user_id: userId });

    if (limit) {
      queryBuilder.limit(limit);
    }

    if (state) {
      queryBuilder.where({ state });
    }

    if (sortProperty) {
      queryBuilder.orderBy(sortProperty, sortDirection ?? SortDirection.ASC);
    }

    return queryBuilder.select('*').returning<Task_PG_RS>('*');
  };

  /**
   * Получение task по task_id
   */
  getTaskById = async (id: string, userId: string) => {
    const [task] = await this.knex<TaskEntity>('task').select('*').where({ id, user_id: userId }).returning<Task_PG_RS[]>('*');

    return task;
  };

  /**
   * Метод Task сервиса для создания задачи в БД
   */
  createTask = async (taskDto: Task_FR_RQ, userId: string) => {
    const [task] = await this.knex<TaskEntity>('task')
      .insert({
        user_id: userId,
        name: taskDto.name,
        state: taskDto.state,
        description: taskDto.description,
      })
      .returning<Task_PG_RS[]>('*');

    return task;
  };

  /**
   * Метод Task сервиса для обновления задачи в БД
   */
  updateTask = async (taskDto: Task_FR_RQ, taskId: string, userId: string) => {
    const [task] = await this.knex<TaskEntity>('task')
      .where({ id: taskId, user_id: userId })
      .update({
        name: taskDto.name,
        description: taskDto.description,
        state: taskDto.state,
        updated_at: this.knex.fn.now(),
      })
      .returning<Task_PG_RS[]>('*');

    return task;
  };

  /**
   * Метод Task сервиса для удаление задачи из БД по ID задачи
   */
  deleteTask = async (taskId: string, userId: string) => {
    const [task] = await this.knex<TaskEntity>('task').where({ id: taskId, user_id: userId }).delete<Task_PG_RS[]>('*');

    return task;
  };
}
