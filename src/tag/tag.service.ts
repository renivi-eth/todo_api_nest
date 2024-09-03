import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { TagEntity } from 'src/lib/types/tag.entity';
import { TaskEntity } from 'src/lib/types/task.entity';
import { Tag_FR_RQ } from 'src/dto/dto-request/tag-fr-request';
import { Tag_PG_RS } from 'src/dto/dto-response/tag-pg-response';
import { Task_PG_RS } from 'src/dto/dto-response/task-pg-response';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Task_Tag_PG_RS } from 'src/dto/dto-response/task-tag-pg-response';
import { TagsQueryDTO } from 'src/dto/dto-query-param-request/tag-query-request';

@Injectable()
export class TagService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
  ) {}

  /**
   * Метод Tag сервиса для получения всех тэгов из БД
   */
  getAllTag = async (userId: string, query: TagsQueryDTO) => {
    const { limit, sortProperty, sortDirection } = query;

    const queryBuilder = this.knex.table<TagEntity>('tag').select('*').where({ user_id: userId });

    if (limit) {
      queryBuilder.limit(limit);
    }

    return queryBuilder.select('*').orderBy(sortProperty, sortDirection).returning<Tag_PG_RS>('*');
  };

  getTagById = async (id: string, userId: string) => {
    const [tag] = await this.knex<TagEntity>('tag').select('*').where({ id: id, user_id: userId }).returning<Tag_PG_RS[]>('*');

    return tag;
  };

  /**
   * Метод Tag сервиса для создания нового тэга в БД
   */
  createTag = async (tagDto: Tag_FR_RQ, userId: string) => {
    const [tag] = await this.knex<TagEntity>('tag')
      .insert({
        name: tagDto.name,
        user_id: userId,
      })
      .returning<Tag_PG_RS[]>('*');

    return tag;
  };

  /**
   * Метод Tag сервиса для удаление всех тэгов из БД по ID тэга
   */
  updateTag = async (tagDto: Tag_FR_RQ, tagId: string, userId: string) => {
    const [tag] = await this.knex<TagEntity>('tag')
      .where({ id: tagId, user_id: userId })
      .update({
        name: tagDto.name,
        updated_at: this.knex.fn.now(),
      })
      .returning<Tag_PG_RS[]>('*');

    return tag;
  };

  /**
   * Метод Tag сервиса для удаление всех тэгов из БД по ID тэга
   */
  deleteTag = async (tagId: string, userId: string) => {
    const [deleteTag] = await this.knex<TagEntity>('tag').where({ id: tagId, user_id: userId }).del().returning<Tag_PG_RS[]>('*');

    return deleteTag;
  };

  /**
   * Метод Tag для создания связи между тэгом и задачей
   */
  createRelationTagTask = async (tagId: string, taskId: string, userId: string) => {
    const [task, tag] = await Promise.all([
      this.knex<TaskEntity>('task').select('id').where({ id: taskId, user_id: userId }).returning<Task_PG_RS>('id'),
      this.knex<TagEntity>('tag').select('id').where({ id: tagId, user_id: userId }).returning<Tag_PG_RS>('id'),
    ]);

    if (!task) {
      throw new UnauthorizedException(ExceptionError.TASK_NOT_FOUND);
    }

    if (!tag) {
      throw new UnauthorizedException(ExceptionError.TAG_NOT_FOUND);
    }

    // Если задача / тэг принадлежат пользователю И (!) такой связи еще нет, создаем связь
    const [relations] = await this.knex('task_tag')
      .insert({ taskId, tagId })
      .returning<Task_Tag_PG_RS[]>('*')
      .catch((err) => {
        if ((err.code = 123)) {
          throw new UnauthorizedException(ExceptionError.RELATION_ALREADY_EXIST);
        }

        throw new InternalServerErrorException('Database error');
      });

    return relations;
  };
}
