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
      numFollowing: user.numFollowing,
      numFollowers: user.numFollowers,
      numPosts: user.numPosts,
      posts: user.posts,
      followers: user.followers,
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
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Get image of post owner
// @route POST /api/users/post/:username
// @access Public
const getPostUserImage = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (user) {
    const { profileImage } = user;
    res.json({ profileImage });
  } else {
    res.status(401);
    throw new Error('Invalid username');
  }
});

// @desc Get details of user profile
// @route POST /api/users/post/:username
// @access Public
const getUserProfileDetails = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
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
    });
  } else {
    res.status(401);
    throw new Error('Invalid username');
  }
});

// @desc Follow user & increase your own following
// @route POST /api/users/follow/:username
// @access Public
const followUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const followedUser = await User.findOne({ username });
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

// @desc Follow user & increase your own following
// @route POST /api/users/follow/:username
// @access Public
const unfollowUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const unFollowedUser = await User.findOne({ username });
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
// @route GET /api/users/
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

// @desc Get details of user profile
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

export {
  registerUser,
  authUser,
  getPostUserImage,
  getUserProfileDetails,
  followUser,
  unfollowUser,
  getUserDetails,
  updateUserProfile,
};
