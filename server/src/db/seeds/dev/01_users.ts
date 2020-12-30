import * as Knex from 'knex';
import { usersTable } from '../../../config/constants/db/table-name';
import { IUser } from '../../../model/User/IUser';

const usersData = require('./data/01_users.json') as IUser[];

export const seed = (knex: Knex) => {
  return knex(usersTable)
    .del()
    .then(() => knex(usersTable).insert(usersData));
};
