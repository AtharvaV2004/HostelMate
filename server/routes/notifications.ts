import express from 'express';
import { notificationsController } from '../controllers/notificationsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/subscribe', requireAuth, notificationsController.subscribe);

export default router;
