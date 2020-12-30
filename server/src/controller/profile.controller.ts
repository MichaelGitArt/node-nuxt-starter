import { validationResult } from 'express-validator';

// ts
import { RequestHandler } from 'express';
import { IUser, IUserBase, IUserClient } from '../model/User/IUser';

// service
import { updateBase } from '../service/profile.service';

// validation
import { validateProfileNickname } from '../common/validation/profile/nickname.validation';
import { validateName } from '../common/validation/shared/name.validation';
import { handleValidationMiddleware } from '../middleware/handle-validation.middleware';

const getProfile: RequestHandler = (req, res) => {
  const {
    nickname,
    name,
    avatar,
    connectedTelegram,
    connectedGoogle,
  } = req.user as IUser;

  res.json({
    user: {
      nickname,
      name,
      avatar,
      connectedTelegram,
      connectedGoogle,
    },
    success: true,
  });
};

const checkNickname: RequestHandler[] = [
  validateProfileNickname,

  handleValidationMiddleware,

  (_, res) => {
    res.json({
      success: true,
    });
  },
];

const updateProfile: RequestHandler[] = [
  validateProfileNickname,
  validateName(),

  handleValidationMiddleware,

  async (req, res) => {
    const { id } = req.user as IUser;
    const { name, nickname } = req.body as IUserBase;

    let updatedUser: IUserClient | void = await updateBase({
      id,
      name,
      nickname,
    });

    if (updatedUser) {
      return res.json({
        success: true,
        isValid: true,
        user: updatedUser,
      });
    }

    throw new Error();
  },
];

export default {
  getProfile,
  checkNickname,
  updateProfile,
};
