import * as dotenv from 'dotenv';
import { Tag } from 'src/database/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Tag_FR_RQ } from 'src/lib/dto/dto-request/tag-fr-request';
import { Tag_PG_RS } from 'src/lib/dto/dto-response/tag-pg-response';
import { ExceptionError } from 'src/lib/variables/exception-error';
import { Task_Tag_PG_RS } from 'src/lib/dto/dto-response/task-tag-pg-response';
import { TagsQueryDTO } from 'src/lib/dto/dto-query-param-request/tag-query-request';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

dotenv.config();

@Injectable()
export class TagService {
  constructor(
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

    const result = await queryBuilder.getMany();

    return result;
  };

  /**
   * Получение тэга по id, user_id
   */
  getTagById = async (id: string, userId: string): Promise<Tag_PG_RS> => {
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
   * Метод Tag сервиса для удаления всех тэгов из БД по ID тэга
   */
  deleteTag = async (tagId: string, userId: string): Promise<Tag_PG_RS> => {
    const [[tag]] = await this.tagRepository
      .query('DELETE FROM tag WHERE id = $1 AND user_id = $2 RETURNING *', [tagId, userId])
      .catch((err) => {
        if (err instanceof QueryFailedError) {
          throw new InternalServerErrorException(ExceptionError.DATABASE_ERROR);
        }

        throw new InternalServerErrorException(ExceptionError.UNEXPECTED_ERROR);
      });

    return tag;
  };

  /**
   * Создания связи между задачей и тэгом
   */
  createRelationTagTask = async (tagId: string, taskId: string, userId: string) => {
    const [[task], [tag]] = await Promise.all([
      this.tagRepository.query('SELECT id FROM task WHERE id = $1 AND user_id = $2', [taskId, userId]),
      this.tagRepository.query('SELECT id FROM tag WHERE id = $1 AND user_id = $2', [tagId, userId]),
    ]);

    console.log(task);

    if (!task) {
      throw new UnauthorizedException(ExceptionError.TASK_NOT_FOUND);
    }

    if (!tag) {
      throw new UnauthorizedException(ExceptionError.TAG_NOT_FOUND);
    }

    const query = await this.tagRepository
      .createQueryBuilder()
      .insert()
      .into('task_tag')
      .values({
        task_id: taskId,
        tag_id: tagId,
      })
      .returning('*')
      .execute()
      .catch((err) => {
        if (err instanceof QueryFailedError) {
          if (err.driverError?.code === process.env.DUPLICATE_KEY_PG) {
            throw new ConflictException(ExceptionError.RELATION_ALREADY_EXIST);
          }
          throw new InternalServerErrorException(ExceptionError.DATABASE_ERROR);
        }
        throw new InternalServerErrorException(ExceptionError.UNEXPECTED_ERROR);
      });

    const [relations]: Task_Tag_PG_RS[] = query.raw;

    return relations;
  };
}
