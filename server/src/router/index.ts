import express from 'express';
import { errorCodes, HttpError } from '../helper/error/HttpError';

// middleware
import { authMiddleware } from '../middleware/auth.middleware';
import { errorHanlderMiddleware } from '../middleware/error-handler.middleware';

// routes
import authRoutes from './auth.route';
import profileRoutes from './profile.route';

const router = express.Router();

router.use(authMiddleware);

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

// 404
router.use('*', (req, res, next) => {
  next(new HttpError(errorCodes.NOT_FOUND));
});

// error handler
router.use(errorHanlderMiddleware);

export default router;
