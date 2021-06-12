import express from 'express';
import {
  createChat,
  getChatList,
  getSingleChatData,
  getAdditionalMessagesChat,
} from '../controllers/chatControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createChat);
router.route('/list').get(protect, getChatList);
router.route('/:chatId').get(protect, getSingleChatData);
router.route('/:chatId/:offset').get(getAdditionalMessagesChat);

export default router;
