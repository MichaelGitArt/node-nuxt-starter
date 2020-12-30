import { IUserPlan } from './IUserPlan';
import { IUserRole } from './IUserRole';

/**
 * full object of user inserted in the database
 */
export interface IUser {
  id: string;
  nickname: string;
  name: string;
  avatar?: string;

  connectedGoogle?: boolean;
  connectedTelegram?: boolean;

  email?: string;
  telegramId?: string;

  role: keyof IUserRole;
  plan: keyof IUserPlan;
}

export interface IUserBase {
  id: IUser['id'];
  name: IUser['name'];
  nickname: IUser['nickname'];
}

export interface IUserClient {
  name: IUser['name'];
  nickname: IUser['nickname'];
  avatar: IUser['avatar'];
  connectedTelegram: IUser['connectedTelegram'];
  connectedGoogle: IUser['connectedGoogle'];
}

interface ICreateUserAbstract {
  nickname: string;
  name: string;
}

interface ICreateUserWithTelegram extends ICreateUserAbstract {
  connectedTelegram: boolean;
  telegramId: string;
}

interface ICreateUserWithGoogle extends ICreateUserAbstract {
  connectedGoogle: boolean;
  email: string;
}

/**
 * required fields to create a user
 */
export type ICreateUser = ICreateUserWithTelegram | ICreateUserWithGoogle;
