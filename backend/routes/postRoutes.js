import express from 'express';
import {
  getPosts,
  createPost,
  commentPost,
  likePost,
  getPostDetails,
} from '../controllers/postControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id').get(getPostDetails);
router.route('/comment/:id').post(protect, commentPost);
router.route('/like/:id').post(protect, likePost);

export default router;
