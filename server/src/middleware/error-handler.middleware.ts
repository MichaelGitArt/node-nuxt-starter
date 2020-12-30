import { ErrorRequestHandler } from 'express';

// helper
import { errorCodes, HttpError } from '../helper/error/HttpError';

export const errorHanlderMiddleware: ErrorRequestHandler = (
  error,
  _,
  res,
  next
) => {
  const { message, status, code } =
    error instanceof HttpError ? error : errorCodes.UNEXPECTED;

  if (!(error instanceof HttpError)) {
    console.log('Error not processed: ', error);
  }

  res.json({
    success: false,
    error: {
      message,
      status,
      code,
    },
  });
};
