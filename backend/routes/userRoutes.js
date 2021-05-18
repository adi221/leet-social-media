import express from 'express';
import {
  registerUser,
  authUser,
  getPostUserImage,
  getUserProfileDetails,
  followUser,
  unfollowUser,
  getUserDetails,
  updateUserProfile,
  updateUserPassword,
  addPostToSaved,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/settings').put(protect, getUserDetails);
router.route('/login').post(authUser);
router.route('/profile').put(protect, updateUserProfile);
router.route('/profile/password').put(protect, updateUserPassword);
router.route('/post/:id').get(getPostUserImage);
router.route('/:id').get(getUserProfileDetails);
router.route('/follow/:username').put(protect, followUser);
router.route('/unfollow/:username').put(protect, unfollowUser);
router.route('/save/:id').post(protect, addPostToSaved);

export default router;
