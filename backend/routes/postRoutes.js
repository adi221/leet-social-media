import express from 'express';
import {
  getPosts,
  createPost,
  commentPost,
  likePost,
  getPostDetails,
  deletePost,
  getPostLikes,
} from '../controllers/postControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id').get(getPostDetails);
router.route('/comment/:id').post(protect, commentPost);
router.route('/like/:id').post(protect, likePost);
router.route('/delete/:postId/:userId').delete(deletePost);
router.route('/:postId/:offset/likes').get(getPostLikes);

export default router;
