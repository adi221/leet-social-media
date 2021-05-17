import express from 'express';
import {
  registerUser,
  authUser,
  getPostUserImage,
  getUserProfileDetails,
  followUser,
  unfollowUser,
  getUserDetails,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/settings').put(protect, getUserDetails);
router.route('/login').post(authUser);
router.route('/post/:username').get(getPostUserImage);
router.route('/:username').get(getUserProfileDetails);
router.route('/follow/:username').put(protect, followUser);
router.route('/unfollow/:username').put(protect, unfollowUser);

export default router;
