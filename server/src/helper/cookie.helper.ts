import ms from 'ms';

// ts
import { Response, CookieOptions } from 'express';

// config
import { isLocal } from '../config/app.config';
import { expiresIn } from '../config/jwt.config';

const httpOptions: CookieOptions = {
  domain: 'planner.com',
  httpOnly: true,
  secure: !isLocal,
  sameSite: isLocal ? 'strict' : 'none',
};

export const setAccessToken = (res: Response, token: string) => {
  const maxAge = ms(expiresIn);
  res.cookie('accessToken', token, { maxAge, ...httpOptions });
  return res;
};

export const clearAccessToken = (res: Response) => {
  res.clearCookie('accessToken', httpOptions);
  return res;
};
