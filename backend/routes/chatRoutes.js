import express from 'express';
import { createChat, getChatList } from '../controllers/chatControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createChat);
router.route('/list').get(protect, getChatList);

export default router;
