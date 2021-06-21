import express from 'express';
import {
  createComment,
  likeComment,
} from '../controllers/commentControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:postId').post(protect, createComment);
router.route('/like/:commentId').put(protect, likeComment);

export default router;
