import express from 'express';
import {
  registerUser,
  authUser,
  getPostUserDetails,
  getUserProfileDetails,
  followUser,
  unfollowUser,
  getUserDetails,
  updateUserProfile,
  updateUserPassword,
  addPostToSaved,
  getUserSuggestions,
  getUserSearch,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUserSearch);
router.route('/settings').put(protect, getUserDetails);
router.route('/login').post(authUser);
router.route('/profile').put(protect, updateUserProfile);
router.route('/profile/password').put(protect, updateUserPassword);
router.route('/post/:id').get(getPostUserDetails);
router.route('/:id').get(getUserProfileDetails);
router.route('/follow/:id').put(protect, followUser);
router.route('/unfollow/:id').put(protect, unfollowUser);
router.route('/save/:id').post(protect, addPostToSaved);
router.route('/suggest/:id').get(getUserSuggestions);

export default router;
