import knex from 'knex';
import knexConfig from '../../knexfile';

import { NODE_ENV } from '../config/app.config';

export const db = knex(knexConfig[NODE_ENV]);
