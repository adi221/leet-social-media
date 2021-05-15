import express from 'express';
import {
  registerUser,
  authUser,
  getPostUserImage,
  getUserProfileDetails,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/post/:username').get(getPostUserImage);
router.route('/:username').get(getUserProfileDetails);

export default router;
