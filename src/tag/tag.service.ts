import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Tag_FR_RQ } from 'src/dto/tag.fr.request';
import { Tag_PG_RS } from 'src/dto/tag.pg.response';
import { TagEntity } from 'src/lib/types/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectConnection()
    private readonly knex: Knex,
  ) {}

  /**
   * Метод Tag сервиса для получения всех тэгов из БД
   */
  getAllTag = async (user_id: string) => {
    const allTag = await this.knex.table<TagEntity>('tag').select('*').where({ user_id: user_id }).returning<Tag_PG_RS>('*');

    return allTag;
  };

  getTagById = async (id: string, user_id: string) => {
    const [TagById] = await this.knex<TagEntity>('tag').select('*').where({ id: id, user_id }).returning<Tag_PG_RS[]>('*');

    return TagById;
  };

  /**
   * Метод Tag сервиса для создания нового тэга в БД
   */
  createTag = async (tagDto: Tag_FR_RQ, user_id: string) => {
    const [newTag] = await this.knex<TagEntity>('tag')
      .insert({
        name: tagDto.name,
        user_id: user_id,
      })
      .returning<Tag_PG_RS[]>('*');

    return newTag;
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
}
