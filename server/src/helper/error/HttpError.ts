import { errorCodes } from './error-codes';

// ts
import { IHttpError } from '../../model/IHttpError';

export class HttpError extends Error {
  status: number;
  code: string;

  constructor({ status, message, code }: IHttpError) {
    super(message);

    if (status < 400 || status > 599) {
      throw new Error(`Expected error HTTP status (400 - 599), got ${status}`);
    }
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
  }

  static createError(options: IHttpError = errorCodes.UNEXPECTED) {
    const { status, message, code } = options;
    if (status && message && code) {
      return new HttpError({ status, message, code });
    }

    return new HttpError(errorCodes.UNEXPECTED);
  }
}

export * from './error-codes';
