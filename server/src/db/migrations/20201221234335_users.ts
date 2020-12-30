import * as Knex from 'knex';

// ts
import { IUserPlan } from '../../model/User/IUserPlan';
import { IUserRole } from '../../model/User/IUserRole';

// constants
import { UserRole } from '../../config/constants/user/user-role';
import { UserPlan } from '../../config/constants/user/user-plan';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('users', (tableBuilder) => {
    tableBuilder.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    tableBuilder.string('name', 30).notNullable();
    tableBuilder.string('nickname', 20).unique().notNullable();
    tableBuilder.text('avatar').defaultTo('');

    tableBuilder.boolean('connectedGoogle').defaultTo(false);
    tableBuilder.boolean('connectedTelegram').defaultTo(false);

    tableBuilder.string('email', 64);
    tableBuilder.string('telegramId', 9);

    // role
    let roleArr = Object.values(UserRole) as IUserRole[keyof IUserRole][];
    tableBuilder
      .enu('role', roleArr, { useNative: true, enumName: 'user_role_type' })
      .notNullable()
      .defaultTo(UserRole.USER);

    tableBuilder.enu('sex', ['male', 'female']);

    // plan
    let planArr = Object.values(UserPlan) as IUserPlan[keyof IUserPlan][];
    tableBuilder
      .enu('plan', planArr, { useNative: true, enumName: 'user_plan_type' })
      .notNullable()
      .defaultTo(UserPlan.FREE);
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema
    .dropTableIfExists('users')
    .raw('DROP TYPE IF EXISTS user_role_type')
    .raw('DROP TYPE IF EXISTS user_plan_type');
