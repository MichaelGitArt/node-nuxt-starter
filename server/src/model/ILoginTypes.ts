import { IGoogleUser, ITelegramUser } from './passport';

export type ILoginTypes = {
  google: IGoogleUser;
  telegram: ITelegramUser;
};
