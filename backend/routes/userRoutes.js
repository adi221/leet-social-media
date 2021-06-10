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
  deleteUser,
  getUserStats,
  getUserFollowers,
  getUserFollowing,
  getUserSavedLikedPosts,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUserSearch);
router.route('/settings').put(protect, getUserDetails);
router.route('/login').post(authUser);
router.route('/profile').put(protect, updateUserProfile);
router.route('/profile/password').put(protect, updateUserPassword);
router.route('/post/:id').get(getPostUserDetails);
router.route('/:username').get(getUserProfileDetails);
router.route('/:id').delete(deleteUser);
router.route('/relatedposts/:username').get(getUserSavedLikedPosts);
router.route('/follow/:id').put(protect, followUser);
router.route('/unfollow/:id').put(protect, unfollowUser);
router.route('/save/:id').post(protect, addPostToSaved);
router.route('/suggest/:id').get(getUserSuggestions);
router.route('/stats/:id').get(getUserStats);
router.route('/:userId/:offset/followers').get(getUserFollowers);
router.route('/:userId/:offset/following').get(getUserFollowing);

export default router;
