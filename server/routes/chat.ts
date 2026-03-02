import express from 'express';
import { body } from 'express-validator';
import { chatController } from '../controllers/chatController.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/requests/:id/chat', requireAuth, chatController.getMessages);

router.post('/:request_id',
  requireAuth,
  [
    body('message').notEmpty().trim(),
  ],
  validate,
  chatController.sendMessage
);

export default router;
