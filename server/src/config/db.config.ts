import './index';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

export const dbName = DB_NAME as string;
export const dbUsername = DB_USERNAME as string;
export const dbPassword = DB_PASSWORD as string;
export const dbHost = DB_HOST as string;
