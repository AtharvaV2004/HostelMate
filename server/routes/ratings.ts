import express from 'express';
import { body } from 'express-validator';
import { ratingsController } from '../controllers/ratingsController.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/',
  requireAuth,
  [
    body('to_user_id').isUUID(),
    body('trip_id').isUUID(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().trim(),
  ],
  validate,
  ratingsController.submitRating
);

export default router;
