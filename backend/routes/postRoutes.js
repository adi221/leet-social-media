import express from 'express';
import { getPosts, createPost } from '../controllers/postControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);

export default router;
