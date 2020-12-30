import express from 'express';

// controler
import profileController from '../controller/profile.controller';

// middleware
import { premit } from '../middleware/permit.middleware';

const router = express.Router();

router.use(premit(['AUTHORIZED']));

router.get('/base', profileController.getProfile);
router.post('/check-nickname', profileController.checkNickname);
router.post('/update', profileController.updateProfile);

export default router;
