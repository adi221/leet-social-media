import express from 'express';
import {
  createComment,
  likeComment,
  getComments,
} from '../controllers/commentControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:postId').post(protect, createComment);
router.route('/like/:commentId').put(protect, likeComment);
router.route('/:postId/:offset').get(getComments);

export default router;
