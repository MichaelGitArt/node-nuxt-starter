import { db } from '../db/connection';

// ts
import { IUser, IUserBase, IUserClient } from '../model/User/IUser';

// constant
import { usersTable } from '../config/constants/db/table-name';

// query
import generalQuery from '../db/queries/general.query';
import userQuery from '../db/queries/user.query';

/**
 * check uniqueness of current nickname
 * @param nickname
 */
export async function checkNicknameUniqueness(
  nickname: string
): Promise<boolean> {
  return generalQuery.isValueUnique(nickname, usersTable, 'nickname');
}

/**
 * update some user fields
 * @param userData fields from IUserBase interface
 */
export async function updateBase(
  userData: IUserBase
): Promise<IUserClient | void> {
  const trx = await db.transaction();

  return userQuery
    .updateBase(userData, trx)
    .then((updatedUser: IUser) => {
      trx.commit();
      return userClientFields(updatedUser);
    })
    .catch(() => {
      trx.rollback();
    });
}

/**
 * extract fields, which will be sent to client side
 * @param user object from database
 */
export function userClientFields(user: IUser): IUserClient {
  return {
    nickname: user.nickname,
    name: user.name,
    avatar: user.avatar,
    connectedTelegram: user.connectedTelegram,
    connectedGoogle: user.connectedGoogle,
  };
}
