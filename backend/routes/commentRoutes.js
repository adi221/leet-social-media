import express from 'express';
import {
  createComment,
  likeComment,
  getComments,
  createCommentReply,
  getCommentReplies,
  likeCommentReply,
  deleteComment,
  deleteCommentReply,
} from '../controllers/commentControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:postId').post(protect, createComment);
router.route('/reply/:parentCommentId').post(protect, createCommentReply);
router.route('/like/:commentId').put(protect, likeComment);
router.route('/like/reply/:commentReplyId').put(protect, likeCommentReply);
router.route('/replies/:parentCommentId/:offset').get(getCommentReplies);
router.route('/:postId/:offset').get(getComments);
router.route('/:commentId').delete(protect, deleteComment);
router.route('/reply/:commentReplyId').delete(protect, deleteCommentReply);

export default router;
