import { body } from 'express-validator';

// config
import { shortIdChars } from '../../../config/app.config';

// service
import { checkNicknameUniqueness } from '../../../service/profile.service';

// constants
import validationErrors from '../validationErrors';

export const validateProfileNickname = body('nickname')
  .trim()
  .toLowerCase()
  .isLength({
    min: 5,
    max: 20,
  })
  .withMessage(validationErrors.WRONG_LENGTH)
  .bail()
  .isWhitelisted(shortIdChars)
  .withMessage(validationErrors.UNSUPPORTED_SYMBOLS)
  .bail()
  .custom(async (nickname, { req }) => {
    // ok
    if (nickname === req.user.nickname) return true;

    let isUnique = await checkNicknameUniqueness(nickname);

    // ok
    if (isUnique) return true;

    throw new Error(validationErrors.NOT_UNIQUE);
  });
