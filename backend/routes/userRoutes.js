import express from 'express';
import {
  registerUser,
  authUser,
  getPostUserImage,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/post/:username').get(getPostUserImage);

export default router;
