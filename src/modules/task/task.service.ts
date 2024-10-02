import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/database/entities/task.entity';
import { Task_FR_RQ } from '../../lib/dto/dto-request/task-fr-request';
import { Task_PG_RS } from 'src/lib/dto/dto-response/task-pg-response';
import { TaskQueryDTO } from 'src/lib/dto/dto-query-param-request/task-query-request';
import { TagTask_FR_RQ } from 'src/lib/dto/dto-request/tag-task-fr-request';
import { TaskIdParam } from 'src/lib/dto/dto-request/task-id-request';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  /**
   * Получение задач с фильтрами - state, name / created_at, limit
   */
  getAllTask = async (userId: string, query: TaskQueryDTO) => {
    const { limit, state, sortProperty, sortDirection } = query;

    const queryBuilder = this.taskRepository.createQueryBuilder('task').where('task.user_id = :user_id', { user_id: userId });

    if (state) {
      queryBuilder.andWhere('task.state = :state', { state });
    }

    if (sortProperty) {
      queryBuilder.orderBy(`task.${sortProperty}`, sortDirection ?? 'ASC');
    }

    if (limit) {
      queryBuilder.limit(limit);
    }

    return queryBuilder.getMany();
  };

  /**
   * Получение задачи по id, user_id
   */
  getTaskById = async (id: TaskIdParam, userId: string): Promise<Task_PG_RS> => {
    const [task] = await this.taskRepository.query('SELECT * FROM task WHERE id = $1 AND user_id = $2', [id, userId]);

    return task;
  };

  /**
   * Создание задачи
   */
  createTask = async (taskDto: Task_FR_RQ, userId: string) => {
    const query = await this.taskRepository
      .createQueryBuilder()
      .insert()
      .into('task')
      .values({
        user_id: userId,
        name: taskDto.name,
        state: taskDto.state,
        description: taskDto.description,
      })
      .returning('*')
      .execute();

    const [task]: Task_PG_RS[] = query.raw;

    return task;
  };

  /**
   * Обновление задачи
   */
  updateTask = async (taskDto: Task_FR_RQ, taskId: string, userId: string) => {
    await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({
        name: taskDto.name,
        description: taskDto.description,
        state: taskDto.state,
        updated_at: () => 'CURRENT_TIMESTAMP',
      })
      .where('task.id = :task_id', { task_id: taskId })
      .andWhere('task.user_id = :user_id', { user_id: userId })
      .execute();

    const updatedTask = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :task_id', { task_id: taskId })
      .andWhere('task.user_id = :user_id', { user_id: userId })
      .getOne();

    return updatedTask;
  };

  /**
   * Удаление задачи по id, task_id
   */
  deleteTask = async (taskId: TaskIdParam, userId: string): Promise<Task_PG_RS> => {
    const [[task]] = await this.taskRepository.query('DELETE FROM task WHERE id = $1 AND user_id = $2 RETURNING *', [taskId, userId]);

    return task;
  };
}
