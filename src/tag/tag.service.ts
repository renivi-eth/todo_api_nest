import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { TagEntity } from 'src/lib/types/tag.entity';
import { TaskEntity } from 'src/lib/types/task.entity';
import { Tag_FR_RQ } from 'src/dto/dto-request/tag-fr-request';
import { Tag_PG_RS } from 'src/dto/dto-response/tag-pg-response';
import { Task_PG_RS } from 'src/dto/dto-response/task-pg-response';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      queryBuilder.limit(parseInt(limit));
    }

    const tags = await queryBuilder.select('*').orderBy(sortProperty, sortDirection).returning<Tag_PG_RS>('*');

    return tags;
  };

  getTagById = async (id: string, user_id: string) => {
    const [tag] = await this.knex<TagEntity>('tag').select('*').where({ id: id, user_id }).returning<Tag_PG_RS[]>('*');

    return tag;
  };

  /**
   * Метод Tag сервиса для создания нового тэга в БД
   */
  createTag = async (tagDto: Tag_FR_RQ, user_id: string) => {
    const [tag] = await this.knex<TagEntity>('tag')
      .insert({
        name: tagDto.name,
        user_id: user_id,
      })
      .returning<Tag_PG_RS[]>('*');

    return tag;
  };

  /**
   * Метод Tag сервиса для удаление всех тэгов из БД по ID тэга
   */
  updateTag = async (tagDto: Tag_FR_RQ, tag_id: string, user_id: string) => {
    const [updatedTag] = await this.knex<TagEntity>('tag')
      .where({ id: tag_id, user_id: user_id })
      .update({
        name: tagDto.name,
        updated_at: this.knex.fn.now(),
      })
      .returning<Tag_PG_RS[]>('*');

    return updatedTag;
  };

  /**
   * Метод Tag сервиса для удаление всех тэгов из БД по ID тэга
   */
  deleteTag = async (tag_id: string, user_id: string) => {
    const [deleteTag] = await this.knex<TagEntity>('tag').where({ id: tag_id, user_id: user_id }).del().returning<Tag_PG_RS[]>('*');

    return deleteTag;
  };

  /**
   * Метод Tag для создания связи между тэгом и задачей
   */
  createRelationTagTask = async (tag_id: string, task_id: string, user_id: string) => {
    const taskQuery = this.knex<TaskEntity>('task').select('id').where({ id: task_id, user_id }).returning<Task_PG_RS>('id');
    const tagQuery = this.knex<TagEntity>('tag').select('id').where({ id: tag_id, user_id }).returning<Tag_PG_RS>('id');

    const [checkTaskById, checkTagById] = await Promise.all([taskQuery, tagQuery]);

    if (!checkTaskById) {
      throw new UnauthorizedException(ExceptionError.TASK_NOT_FOUND);
    }

    if (!checkTagById) {
      throw new UnauthorizedException(ExceptionError.TAG_NOT_FOUND);
    }

    // TODO: В момент вставки выдаст ошибку, если такая связь уже существует. Проверять не нужно, нужно отловить ошибку

    const existingRelation = await this.knex('task_tag').select('*').where({ task_id, tag_id }).returning<Task_Tag_PG_RS>('*');

    if (existingRelation) {
      return new UnauthorizedException(ExceptionError.RELATION_ALREADY_EXIST);
    }

    // Если задача / тэг принадлежат пользователю И (!) такой связи еще нет, создаем связь
    const [createRelations] = await this.knex('task_tag').insert({ task_id, tag_id }).returning<Task_Tag_PG_RS[]>('*');

    return createRelations;
  };
}
