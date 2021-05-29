import express from 'express';
import {
  readNotification,
  getNotifications,
} from '../controllers/notificationControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').put(protect, readNotification);
router.route('/:id').get(getNotifications);

export default router;
