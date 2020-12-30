import * as Knex from 'knex';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema
    .raw("SET timezone = 'UTC-0'")
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.raw('RESET timezone').raw('DROP EXTENSION "uuid-ossp"');
