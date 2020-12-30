// db
import { db } from '../connection';

// ts
import { Transaction } from 'knex';
import { ICreateUser, IUser, IUserBase } from '../../model/User/IUser';

// constants
import { usersTable } from '../../config/constants/db/table-name';

/**
 * insert user into db
 * @returns {IUser} new user
 */
const insert = async (
  user: ICreateUser,
  trx: Transaction | typeof db = db
): Promise<IUser> => {
  const queryBuilder = trx<ICreateUser>(usersTable);

  const result = await queryBuilder.insert(user).returning('*');
  return result[0] as IUser;
};

/**
 * query to update user base fields
 * @returns {Promise<IUser>} user
 */
const updateBase = async (
  { name, nickname, id }: IUserBase,
  trx: Transaction | typeof db = db
): Promise<IUser> => {
  const queryBuilder = trx<ICreateUser>(usersTable);

  const result = await queryBuilder
    .where('id', id)
    .update({ name, nickname })
    .returning('*');
  return result[0] as IUser;
};

const findByEmail = async (email: string): Promise<IUser | undefined> => {
  const queryBuilder = db<IUser>(usersTable);
  return queryBuilder.where({ email }).first();
};

const findByTelegramId = (telegramId: string): Promise<IUser | undefined> => {
  const queryBuilder = db<IUser>(usersTable);
  return queryBuilder.where({ telegramId }).first();
};

const findById = (id: string): Promise<IUser | undefined> => {
  const queryBuilder = db<IUser>(usersTable);
  return queryBuilder.where({ id }).first();
};

export default {
  insert,
  updateBase,
  findByEmail,
  findByTelegramId,
  findById,
};
