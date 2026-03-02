import express from 'express';
import { body } from 'express-validator';
import { requestsController } from '../controllers/requestsController.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Trip-specific requests
router.post('/trips/:id/requests',
  requireAuth,
  [
    body('item_name').notEmpty().trim(),
    body('quantity').isInt({ min: 1 }),
    body('max_budget').isFloat({ min: 0 }),
    body('urgency').isIn(['low', 'medium', 'high']),
  ],
  validate,
  requestsController.createRequest
);

// General request routes
router.get('/:id', requestsController.getRequestById);

router.patch('/:id',
  requireAuth,
  [
    body('status').isIn(['pending', 'accepted', 'rejected', 'completed']),
  ],
  validate,
  requestsController.updateRequest
);

// QR Handoff
router.post('/:id/qr', requireAuth, requestsController.generateQR);
router.post('/:id/verify-qr',
  requireAuth,
  [
    body('qrToken').notEmpty(),
  ],
  validate,
  requestsController.verifyQR
);

export default router;
