import express from 'express';
import {
  readNotification,
  getNotifications,
  getChatNotifications,
} from '../controllers/notificationControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').put(protect, readNotification).get(protect, getNotifications);
router.route('/chat').get(protect, getChatNotifications);

export default router;
