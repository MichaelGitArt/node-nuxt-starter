import './index';

const {
  PORT,
  WEB_CLIENT_HOST,
  SERVER_DOMAIN,
  UTC_OFFSET,
  SHORTID_CHARS,
} = process.env;

export const appPort = PORT as string;
export const webClientHost = WEB_CLIENT_HOST as string;
export const utcOffset = UTC_OFFSET as string;
export const serverDomain = SERVER_DOMAIN as string;
export const shortIdChars = SHORTID_CHARS as string;
export const isLocal =
  SERVER_DOMAIN === 'localhost' || SERVER_DOMAIN === 'server.planner.com';

export const NODE_ENV = process.env.NODE_ENV as
  | 'development'
  | 'production'
  | 'test';
