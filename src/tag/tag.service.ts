import { Knex } from 'knex';
import { Repository } from 'typeorm';
import { InjectConnection } from 'nest-knexjs';
import { Tag } from 'src/lib/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/lib/types/tag.entity';
import { TaskEntity } from 'src/lib/types/task.entity';
import { Tag_FR_RQ } from 'src/dto/dto-request/tag-fr-request';
import { Tag_PG_RS } from 'src/dto/dto-response/tag-pg-response';
import { Task_PG_RS } from 'src/dto/dto-response/task-pg-response';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { Task_Tag_PG_RS } from 'src/dto/dto-response/task-tag-pg-response';
import { TagsQueryDTO } from 'src/dto/dto-query-param-request/tag-query-request';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  /**
   * Получение тэгов с сортировкой, лимитом - name / created_at, limit
   */

  getAllTag = async (userId: string, query: TagsQueryDTO) => {
    const { limit, sortProperty, sortDirection } = query;

    const queryBuilder = this.tagRepository.createQueryBuilder('tag').where('tag.user_id = :user_id', { user_id: userId });

    if (sortProperty) {
      queryBuilder.orderBy(`tag.${sortProperty}`, sortDirection ?? 'ASC');
    }

    if (limit) {
      queryBuilder.limit(limit);
    }

    return queryBuilder.getMany();
  };

  /**
   * Получение тэга по id, user_id
   */
  getTagById = async (id: string, userId: string) => {
    const [tag] = await this.tagRepository.query('SELECT * FROM tag WHERE  id = $1 AND user_id = $2', [id, userId]);

    return tag;
  };

  /**
   * Создание тэга
   */
  createTag = async (tagDto: Tag_FR_RQ, userId: string) => {
    const query = await this.tagRepository
      .createQueryBuilder()
      .insert()
      .into('tag')
      .values({
        name: tagDto.name,
        user_id: userId,
      })
      .returning('*')
      .execute();

    const [tag]: Tag_PG_RS[] = query.raw;

    return tag;
  };

  /**
   * Обновление тэга
   */
  updateTag = async (tagDto: Tag_FR_RQ, tagId: string, userId: string) => {
    await this.tagRepository
      .createQueryBuilder()
      .update()
      .set({
        name: tagDto.name,
        updated_at: () => 'CURRENT_TIMESTAMP',
      })
      .where('tag.id = :tag_id', { tag_id: tagId })
      .andWhere('tag.user_id = :user_id', { user_id: userId })
      .execute();

    const updatedTag = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.id = :tag_id', { tag_id: tagId })
      .andWhere('tag.user_id = :user_id', { user_id: userId })
      .getOne();

    return updatedTag;
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
        if (err.code == 123) {
          throw new UnauthorizedException(ExceptionError.RELATION_ALREADY_EXIST);
        }

        throw new InternalServerErrorException('Database error');
      });

    return relations;
  };
}
