import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { TagEntity } from 'src/lib/types/tag.entity';
import { Tag_PG_RS } from 'src/dto/tag.pg.response';
import { Tag_FR_RQ } from 'src/dto/tag.fr.request';

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
    const allTag = await this.knex.table<TagEntity[]>('tag').select('*').where(user_id).returning<Tag_PG_RS>('*');

    return allTag;
  };

  createTag = async (tagDto: Tag_FR_RQ, user_id: string) => {
    const [newTag] = await this.knex<TagEntity>('tag')
      .insert({
        name: tagDto.name,
        user_id: user_id,
      })
      .returning<Tag_PG_RS[]>('*');

    return newTag;
  };
}
