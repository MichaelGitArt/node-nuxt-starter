import Knex from 'knex';
import { dbName, dbUsername, dbPassword, dbHost } from './src/config/db.config';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: dbHost,
    user: dbUsername,
    password: dbPassword,
    database: dbName,
    charset: 'utf8',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './src/db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/db/seeds/dev',
  },
};

interface IKnexConfig {
  development: Knex.Config;
  production: Knex.Config;
  test: Knex.Config;
}

export default {
  development: knexConfig,
  production: knexConfig,
  test: knexConfig,
} as IKnexConfig;
