import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
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
  const user = await User.create({ username, email, password });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      description: user.description,
      numFollowing: user.numFollowing,
      numFollowers: user.numFollowers,
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
      email: user.email,
      profileImage: user.profileImage,
      description: user.description,
      numFollowing: user.numFollowing,
      numFollowers: user.numFollowers,
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

export { registerUser, authUser, getPostUserImage };
