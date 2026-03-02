import express from 'express';
import { body } from 'express-validator';
import { tripsController } from '../controllers/tripsController.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', tripsController.getTrips);

router.post('/',
  requireAuth,
  [
    body('destination').notEmpty().trim(),
    body('eta').notEmpty().trim(),
  ],
  validate,
  tripsController.createTrip
);

router.get('/:id', tripsController.getTripById);

router.patch('/:id',
  requireAuth,
  [
    body('status').isIn(['active', 'completed', 'cancelled']),
  ],
  validate,
  tripsController.updateTrip
);

router.delete('/:id', requireAuth, tripsController.deleteTrip);

export default router;
