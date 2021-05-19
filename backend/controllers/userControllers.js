import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;
  const userEmailExists = await User.findOne({ email });
  const userNameExists = await User.findOne({ username });

  if (userEmailExists) {
    res.status(400);
    throw new Error('Email already exists');
  }
  if (userNameExists) {
    res.status(400);
    throw new Error('Username already exists');
  }
  const user = await User.create({ username, name, email, password });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      description: user.description,
      savedPosts: user.savedPosts,
      following: user.following,
      token: generateToken(user._id),
    });
  }
});

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      description: user.description,
      savedPosts: user.savedPosts,
      following: user.following,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Get image of post owner
// @route POST /api/users/post/:id
// @access Public
const getPostUserImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    const { profileImage, username } = user;
    res.json({ profileImage, username });
  } else {
    res.status(401);
    throw new Error('Invalid id');
  }
});

// @desc Get details of user profile
// @route POST /api/users/post/:username
// @access Public
const getUserProfileDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    const {
      profileImage,
      description,
      numFollowers,
      numFollowing,
      numPosts,
      numSavedPosts,
      numLikedPosts,
      following,
      followers,
      posts,
      savedPosts,
      likedPosts,
      name,
      username,
    } = user;

    const userPosts = [],
      userLikedPosts = [],
      userSavedPosts = [];

    for (let i = 0; i < posts.length; i++) {
      const id = posts[i].post;
      const post = await Post.findById(id);
      if (post) {
        userPosts.push(post);
      }
    }

    for (let i = 0; i < numLikedPosts; i++) {
      const id = likedPosts[i].post;
      const post = await Post.findById(id);
      if (post) {
        userLikedPosts.push(post);
      }
    }

    for (let i = 0; i < numSavedPosts; i++) {
      const id = savedPosts[i].post;
      const post = await Post.findById(id).populate('post', 'image');
      if (post) {
        userSavedPosts.push(post);
      }
    }

    res.json({
      profileImage,
      name,
      description,
      numFollowers,
      numFollowing,
      numPosts,
      numSavedPosts,
      numLikedPosts,
      following,
      followers,
      userPosts,
      userLikedPosts,
      userSavedPosts,
      username,
    });
  } else {
    res.status(401);
    throw new Error('Invalid id');
  }
});

// @desc Follow user & increase your own following
// @route POST /api/users/follow/:id
// @access Public
const followUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id === req.user._id) {
    res.status(401).send('User cannot follow himself');
    throw new Error('User cannot follow himself');
  }
  const followedUser = await User.findById(id);
  const followingUser = await User.findById(req.user._id);

  if (followedUser && followingUser) {
    followedUser.followers.push({
      user: req.user._id,
      username: req.user.username,
    });
    followedUser.numFollowers = followedUser.followers.length;
    await followedUser.save();

    followingUser.following.push({
      user: followedUser._id,
      username: followedUser.username,
    });
    followingUser.numFollowing = followingUser.following.length;
    await followingUser.save();

    res.status(200).json({ success: true });
  } else {
    res.status(401).send('Invalid username');
    throw new Error('Invalid username');
  }
});

// @desc Unollow user & remove from your own following
// @route POST /api/users/follow/:id
// @access Public
const unfollowUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id === req.user._id) {
    res.status(401).send('User cannot follow himself');
    throw new Error('User cannot follow himself');
  }
  const unFollowedUser = await User.findById(id);
  const unFollowingUser = await User.findById(req.user._id);

  if (unFollowedUser && unFollowingUser) {
    unFollowedUser.followers = unFollowedUser.followers.filter(
      follower => follower.user.toString() !== req.user._id.toString()
    );
    unFollowedUser.numFollowers = unFollowedUser.followers.length;
    await unFollowedUser.save();

    unFollowingUser.following = unFollowingUser.following.filter(
      follower => follower.user.toString() !== unFollowedUser._id.toString()
    );
    unFollowingUser.numFollowing = unFollowingUser.following.length;
    await unFollowingUser.save();

    res.status(200).json({ success: true });
  } else {
    res.status(401).send('Invalid username');
    throw new Error('Invalid username');
  }
});

// @desc Get details of user profile
// @route GET /api/users
// @access User
const getUserDetails = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ success: false, message: 'User not found' });
    throw new Error('Invalid request');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access User
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.body);
  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.description = req.body.description || user.description;
    user.profileImage = req.body.image || user.profileImage;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      description: updatedUser.description,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
    throw new Error('User not found');
  }
});

// @desc Update user pasword
// @route PUT /api/users/profile/password
// @access User
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { newPassword, oldPassword } = req.body;
    if (newPassword && (await user.matchPassword(oldPassword))) {
      user.password = newPassword;
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Old password incorrect' });
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      description: updatedUser.description,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
    throw new Error('User not found');
  }
});

// @desc Save or unsave posts
// @route PUT /api/users/save/:id
// @access User
const addPostToSaved = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const post = await Post.findById(id);
  const user = await User.findById(_id);
  console.log(user);
  console.log(user.savedPosts);

  if (post) {
    const isAlreadySavedIndex = user.savedPosts.findIndex(
      p => p.post.toString() === id
    );
    if (isAlreadySavedIndex > -1) {
      user.savedPosts.splice(isAlreadySavedIndex, 1);
      user.numSavedPosts = user.savedPosts.length;
      await user.save();
    } else {
      user.savedPosts.push({ post: id });
      user.numSavedPosts = user.savedPosts.length;
      await user.save();
    }

    res.status(201).json({
      success: true,
      userInfo: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        description: user.description,
        savedPosts: user.savedPosts,
        following: user.following,
        token: generateToken(user._id),
      },
      message: `Post ${
        isAlreadySavedIndex > -1 ? 'removed' : 'added'
      } from saved posts`,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Post not found',
    });
    throw new Error('Post was not found');
  }
});

export {
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
};
