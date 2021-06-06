import express from 'express';
import { createChat, getChatLists } from '../controllers/chatControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:partnerId').post(protect, createChat);
router.route('/lists').get(protect, getChatLists);

export default router;
