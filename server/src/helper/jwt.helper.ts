import jwt from 'jsonwebtoken';

// config
import { expiresIn, secretKey } from '../config/jwt.config';

export const createJwt = (data: any) =>
  jwt.sign(data, secretKey, { expiresIn });

export const createDummyJwt = () => jwt.sign({}, secretKey);

export const verifyJwt = (token: string) => jwt.verify(token, secretKey);
