import express from 'express';
import {
  createChat,
  getChatList,
  getSingleChatData,
  getAdditionalMessagesChat,
  addUsersToGroup,
  leaveGroup,
  hideChatForUser,
} from '../controllers/chatControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createChat);
router.route('/list').get(protect, getChatList);
router
  .route('/:chatId')
  .get(protect, getSingleChatData)
  .put(protect, addUsersToGroup);
router.route('/:chatId/:offset').get(getAdditionalMessagesChat);
router.route('/leave/:chatId').put(protect, leaveGroup);
router.route('/hide/:chatId').put(protect, hideChatForUser);

export default router;
