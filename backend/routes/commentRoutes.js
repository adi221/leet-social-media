import express from 'express';
import {
  createComment,
  likeComment,
  getComments,
  createCommentReply,
  getCommentReplies,
  likeCommentReply,
} from '../controllers/commentControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:postId').post(protect, createComment);
router.route('/like/:commentId').put(protect, likeComment);
router.route('/:postId/:offset').get(getComments);
router.route('/reply/:parentCommentId').post(protect, createCommentReply);
router.route('/replies/:parentCommentId/:offset').get(getCommentReplies);
router.route('/like/reply/:commentReplyId').put(protect, likeCommentReply);

export default router;
