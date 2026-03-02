import express from 'express';
import { usersController } from '../controllers/usersController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', requireAuth, usersController.getMe);
router.get('/:id', usersController.getProfile);

export default router;
