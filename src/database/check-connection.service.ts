import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

/**
 * Сервис проверки соединения с Базой Данных, через OnModuleInit (вызывается сразу при работе с модулем)
 */
@Injectable()
export class CheckConnectionService implements OnModuleInit {
  private readonly logger = new Logger(CheckConnectionService.name);

  constructor(@InjectConnection() private readonly knex: Knex) {}

  async onModuleInit() {
    await this.checkConnection();
  }

  checkConnection = async () => {
    await this.knex
      .raw('SELECT NOW()')
      .then(() => {
        this.logger.log('Connection with Postgres successful');
      })
      .catch((err) => {
        this.logger.error('Error with connection PostgreSQL');
        this.logger.error(err);
      });
  };
}
