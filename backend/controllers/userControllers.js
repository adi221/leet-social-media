import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Notification from '../models/notificationModel.js';
import { sendNotification } from '../handlers/socketHandlers.js';
import { resizeImage } from '../handlers/imageResizeHandlers.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;
  const userEmailExists = await User.findOne({ email });
  const userNameExists = await User.findOne({ username });

  if (userEmailExists) {
    res.status(400).json({ success: false, message: 'Email already exists' });
    throw new Error('Email already exists');
  }
  if (userNameExists) {
    res
      .status(400)
      .json({ success: false, message: 'Username already exists' });
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
    res
      .status(400)
      .json({ success: false, message: 'Invalid email or password' });
    throw new Error('Invalid email or password');
  }
});

// @desc Get image, name, id of post owner
// @route POST /api/users/post/:id
// @access Public
const getPostUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, '_id name username profileImage');

  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ success: false, message: 'Invalid Id' });
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
      following,
      followers,
      posts,
      savedPosts,
      likedPosts,
      name,
      username,
      _id,
    } = user;

    const userPosts = await Post.aggregate([
      {
        $match: { user: ObjectId(id) },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          image: true,
          comments: { $size: '$comments' },
          likes: { $size: '$likes' },
          description: true,
        },
      },
    ]);

    const userLikedPosts = [],
      userSavedPosts = [];

    // for (let i = 0; i < likedPosts.length; i++) {
    //   const id = likedPosts[i].post;
    //   const post = await Post.findById(id);
    //   if (post) {
    //     userLikedPosts.push(post);
    //   }
    // }

    // for (let i = 0; i < savedPosts.length; i++) {
    //   const id = savedPosts[i].post;
    //   const post = await Post.findById(id).populate('post', 'image');
    //   if (post) {
    //     userSavedPosts.push(post);
    //   }
    // }

    res.json({
      profileImage,
      name,
      description,
      following,
      followers,
      userPosts,
      userLikedPosts,
      userSavedPosts,
      username,
      _id,
    });
  } else {
    res.status(401).json({ success: false, message: 'User not found' });
    throw new Error('Invalid id');
  }
});

// @desc Follow user & increase your own following
// @route POST /api/users/follow/:id
// @access Public
const followUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id === req.user._id) {
    res
      .status(401)
      .json({ success: false, message: 'User cannot follow himself' });
    throw new Error('User cannot follow himself');
  }
  const followedUser = await User.findById(id);
  const followingUser = await User.findById(req.user._id);

  if (followedUser && followingUser) {
    followedUser.followers.push({
      user: req.user._id,
      username: req.user.username,
    });

    await followedUser.save();

    followingUser.following.push({
      user: followedUser._id,
      username: followedUser.username,
    });

    await followingUser.save();

    const notification = new Notification({
      sender: req.user._id,
      receiver: id,
      notificationType: 'follow',
    });
    await notification.save();

    sendNotification(req, {
      ...notification.toObject(),
      senderDetails: {
        _id: req.user._id,
        username: followingUser.username,
        profileImage: followingUser.profileImage,
      },
    });

    res.status(200).json(followingUser.following);
  } else {
    res.status(401).json({ success: false, message: 'User not found' });
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

    await unFollowedUser.save();

    unFollowingUser.following = unFollowingUser.following.filter(
      follower => follower.user.toString() !== unFollowedUser._id.toString()
    );

    await unFollowingUser.save();

    // Delete prev receiver's notification for follow
    await Notification.deleteMany({
      sender: req.user._id,
      receiver: id,
      notificationType: 'follow',
    });

    res.status(200).json(unFollowingUser.following);
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
  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.description = req.body.description || user.description;
    if (req.body.image) {
      const resizedImage = await resizeImage(req.body.image, 75, 75);
      user.profileImage = resizedImage || user.profileImage;
    }
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

  if (post) {
    const isAlreadySavedIndex = user.savedPosts.findIndex(
      p => p.post.toString() === id
    );
    if (isAlreadySavedIndex > -1) {
      user.savedPosts.splice(isAlreadySavedIndex, 1);
      await user.save();
    } else {
      user.savedPosts.push({ post: id });
      await user.save();
    }

    res.status(201).json(user.savedPosts);
  } else {
    res.status(404).json({
      success: false,
      message: 'Post not found',
    });
    throw new Error('Post was not found');
  }
});

// @desc Get bookmarked posts of user and following users of user
// @route GET /api/users/stats/:id
// @access User
const getUserStats = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    const { savedPosts, following } = user;
    res.status(201).json({ savedPosts, following });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// @desc Get user suggestions to follow
// @route GET /api/users/suggest/:id
// @access User
const getUserSuggestions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const users = await User.find(
    { _id: { $ne: id } },
    '_id name username profileImage'
  ).limit(5);
  if (users) {
    res.json(users);
  } else {
    res
      .status(201)
      .json({ success: false, message: 'No suggestions available' });
  }
});

// @desc Get users from search query
// @route GET /api/users?keyowrd=${keyword}
// @access User
const getUserSearch = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    res.json({ success: false, message: 'No search query' });
  }
  const users = await User.find({
    username: { $regex: keyword, $options: 'i' },
  });
  /*
  Find Users based on name or username.
  const users = await User.find({
    $or: [
      { username: { $regex: keyword, $options: 'i' } },
      { name: { $regex: keyword, $options: 'i' } },
    ],
  });
  */
  const updatedUsers = users.map(user => {
    const { _id, name, username, profileImage } = user;
    return { _id, name, username, profileImage };
  });
  res.json(updatedUsers);
});

const getRelatedUsers = async (users, offset) => {
  // same as collection.skip(offset).limit(10)
  const partitionedUsers = users.slice(offset, offset + 10);
  let usersArr = [];
  for (const user of partitionedUsers) {
    const userData = await User.findById(
      user.user,
      '_id name username profileImage'
    );
    if (userData) {
      usersArr.push(userData);
    }
  }
  return usersArr;
};

// @desc Get list of user's followers
// @route GET /api/users/:userId/:offset/followers
// @access User
const getUserFollowers = asyncHandler(async (req, res) => {
  const { userId, offset = 0 } = req.params;
  const userFollowers = await User.findById(userId).select('followers');
  const users = await getRelatedUsers(userFollowers.followers, offset);
  if (users) {
    res.json(users);
  } else {
    res
      .status(201)
      .json({ success: false, message: 'Could not retrieve users' });
  }
});

// @desc Get list of user's following
// @route GET /api/users/:userId/:offset/following
// @access User
const getUserFollowing = asyncHandler(async (req, res) => {
  const { userId, offset = 0 } = req.params;
  const userFollowing = await User.findById(userId).select('following');
  const users = await getRelatedUsers(userFollowing.following, offset);
  if (users) {
    res.json(users);
  } else {
    res
      .status(201)
      .json({ success: false, message: 'Could not retrieve users' });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log(user);
  // Remove all follows from users
  for (const follow of user.following) {
    const followedUser = await User.findById(follow.user);
    if (followedUser) {
      followedUser.followers = followedUser.followers.filter(
        follow => follow.user !== id
      );
      await followedUser.save();
    }
  }
  for (const follow of user.followers) {
    const followingUser = await User.findById(follow.user);
    if (followingUser) {
      followingUser.following = followingUser.following.filter(
        follow => follow.user !== id
      );
      await followingUser.save();
    }
  }
  // Remove all likes from posts
  for (const post of user.likedPosts) {
    const likedPost = await Post.findById(post.post);
    if (likedPost) {
      likedPost.likes = likedPost.likes.filter(user => user.user !== id);
      await likedPost.save();
    }
  }
  // Delete the user and all his post
  Promise.all([
    Post.deleteMany({ user: id }),
    User.findOneAndRemove({ _id: id }),
  ])
    .then(() => res.json({ success: true, message: 'User Deleted' }))
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'Server error',
      })
    );
});

export {
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
};
