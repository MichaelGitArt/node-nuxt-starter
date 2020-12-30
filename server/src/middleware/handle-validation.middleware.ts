// ts
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const handleValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const validationErrors = result.mapped();

  res.json({
    success: true,
    isInvalid: true,
    validationErrors,
  });
};
