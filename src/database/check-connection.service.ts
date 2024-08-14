import { Injectable, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

/**
 * Сервис, проверки соединения к БД при инициализации приложения
 * Имплементируется от OnModuleInit, создаем конструктор на knex
 * Функция onModuleInit вызывается один раз при инициализация модуля (в App.Module), внутри себя вызывает функцию проверки соединения
 */
@Injectable()
export class CheckConnectionService implements OnModuleInit {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async onModuleInit() {
    await this.checkConnection();
  }

  // TODO: err.code добавить (посмотреть логику работы try / catch)
  async checkConnection() {
    try {
      await this.knex.raw('SELECT NOW()');
      console.log('Connection with Postgres successful');
    } catch (err) {
      console.error('Error with connection PostgreSQL');
    }
  }
}
