import { body } from 'express-validator';

// constants
import validationErrors from '../validationErrors';

export const validateName = (fieldName = 'name') => {
  return body(fieldName)
    .trim()
    .isLength({
      min: 1,
      max: 30,
    })
    .withMessage(validationErrors.WRONG_LENGTH)
    .matches(new RegExp('^[a-zA-Z0-9а-яА-Я ]+$', 'i'))
    .withMessage(validationErrors.UNSUPPORTED_SYMBOLS);
};
