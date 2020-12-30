import express from 'express';

// controler
import authController from '../controller/auth.controller';

// middleware
import { premit } from '../middleware/permit.middleware';

const router = express.Router();

router.get('/google', premit(['ANONYMOUS'], '/'), authController.googleAuth);

router.get(
  '/google/callback',
  authController.googleAuthRedirect,
  authController.googleAuthHandle
);

router.get(
  '/telegram',
  premit(['ANONYMOUS'], '/'),
  authController.telegramAuth,
  authController.telegramAuthHandle
);

router.post('/logout', premit(['AUTHORIZED']), authController.logout);

export default router;
