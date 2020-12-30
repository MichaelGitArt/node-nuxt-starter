// ts
import { IHttpError } from '../../model/IHttpError';

interface IErrorCodes {
  UNEXPECTED: IHttpError;
  UNAUTHORIZED: IHttpError;
  FORBIDDEN: IHttpError;
  NOT_FOUND: IHttpError;
}

export const errorCodes: IErrorCodes = {
  UNAUTHORIZED: {
    status: 401,
    code: 'UNAUTHORIZED_ERROR',
    message: 'You have to be authorized before accessing this resource',
  },
  FORBIDDEN: {
    status: 403,
    code: 'FORBIDDEN_ERROR',
    message: 'You have no permission',
  },
  NOT_FOUND: {
    status: 404,
    code: 'NOT_FOUND_ERROR',
    message: 'Resource not found',
  },
  UNEXPECTED: {
    status: 500,
    code: 'UNEXPECTED_ERROR',
    message: 'Some unexpected error occurred. Try again later',
  },
};
