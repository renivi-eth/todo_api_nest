import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [join(__dirname, 'entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/*{.js,.ts}')],

  synchronize: false,
});

