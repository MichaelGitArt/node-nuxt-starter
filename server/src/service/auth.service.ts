import shortId from 'shortid';

// query
import userQuery from '../db/queries/user.query';

// helper
import { generareUniqueSlug } from '../helper/slug.helper';

// ts
import { ICreateUser, IUser } from '../model/User/IUser';
import { ILoginTypes } from '../model/ILoginTypes';

// config
import { shortIdChars } from '../config/app.config';
import { usersTable } from '../config/constants/db/table-name';
import { createJwt } from '../helper/jwt.helper';

interface authResult {
  accessToken: string;
}

shortId.characters(shortIdChars);

export async function telegramLoginOrRegister(
  authUser: ILoginTypes['telegram']
): Promise<authResult> {
  const existUser = await userQuery.findByTelegramId(authUser.id);
  if (existUser) return generateToken(existUser);

  const nickname = await generareUniqueSlug<IUser>(usersTable, 'nickname');

  const user: ICreateUser = {
    nickname,
    name: authUser.first_name,
    connectedTelegram: true,
    telegramId: authUser.id,
  };

  return register(user).then((user) => generateToken(user));
}

export async function googleLoginOrRegister(
  authUser: ILoginTypes['google']
): Promise<authResult> {
  const existUser = await userQuery.findByEmail(authUser.emails![0].value);
  if (existUser) return generateToken(existUser);

  const nickname = await generareUniqueSlug<IUser>(usersTable, 'nickname');

  const user: ICreateUser = {
    nickname,
    name: authUser.displayName,
    connectedGoogle: true,
    email: authUser.emails![0].value,
  };

  return register(user).then((user) => generateToken(user));
}

/**
 * insert new user into database
 */
async function register(authUser: ICreateUser): Promise<IUser> {
  return userQuery.insert(authUser);
}

/**
 * generate token for jwt authorization
 */
function generateToken(user: IUser): authResult {
  let accessToken = createJwt({ sub: user.id });

  return { accessToken };
}
