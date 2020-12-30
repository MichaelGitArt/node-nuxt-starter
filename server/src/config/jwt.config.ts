import './index';

const { SECRET_KEY, JWT_EXPIRES_IN } = process.env;

export const secretKey = SECRET_KEY as string;
export const expiresIn = JWT_EXPIRES_IN as string;
