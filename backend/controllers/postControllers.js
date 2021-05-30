import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Notification from '../models/notificationModel.js';
import { sendNotification } from '../handlers/socketHandlers.js';

import imageThumbnail from 'image-thumbnail';

// @desc Get all posts - from followers and user's posts
// @route GET /api/posts
// @access User
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  const postsId = posts.map(post => post._id);
  // [ 60a23419fe5b4a47c4d26d68, 60a233ebfe5b4a47c4d26d66 ]
  // res.json(posts);
  res.json(postsId);
});

// @desc Create a post
// @route POST /api/posts
// @access User
const createPost = asyncHandler(async (req, res) => {
  const { file, tags, description } = req.body;
  const { _id, username } = req.user;

  const user = await User.findById(_id);

  const post = new Post({
    user: _id,
    username,
    description,
    tags,
    image: file,
    likes: [],
    comments: [],
  });
  const createdPost = await post.save();

  user.posts.push({ post: post._id });

  await user.save();

  res.status(201).json(createdPost);
});

// @desc Comment on post
// @route POST /api/posts/comment/:id
// @access User
const commentPost = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const post = await Post.findById(id);

  const newComment = {
    user: req.user._id,
    username: req.user.username,
    comment,
  };
  post.comments.push(newComment);

  await post.save();
  if (post.user.toString() !== req.user._id.toString()) {
    const notification = new Notification({
      sender: req.user._id,
      receiver: post.user,
      notificationType: 'comment',
      notificationData: {
        postId: id,
        postImage: post.image,
        comment,
      },
    });
    await notification.save();

    sendNotification(req, { ...notification });
  }

  res.status(201).json(newComment);
});

// @desc Like or remove like from a post
// @route POST /api/posts/like/:id
// @access User
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id, username } = req.user;

  const post = await Post.findById(id);
  const user = await User.findById(_id);

  if (post) {
    const alreadyLikedIndex = post.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    );
    if (alreadyLikedIndex > -1) {
      post.likes.splice(alreadyLikedIndex, 1);
      await post.save();

      user.likedPosts = user.likedPosts.filter(
        p => p.post.toString() !== post._id.toString()
      );
      await user.save();

      if (post.user !== req.user._id) {
        // Delete prev receiver's notification for like
        await Notification.deleteMany({
          sender: req.user._id,
          receiver: post.user,
          notificationType: 'like',
        });
      }
    } else {
      post.likes.push({ user: _id, username });
      await post.save();

      user.likedPosts.push({ post: post._id });
      await user.save();

      if (post.user.toString() !== req.user._id.toString()) {
        const notification = new Notification({
          sender: _id,
          receiver: post.user,
          notificationType: 'like',
          notificationData: {
            postId: id,
            postImage: post.image,
          },
        });
        await notification.save();

        sendNotification(req, { ...notification });
      }
    }

    res.status(201).json(post.likes);
  } else {
    res.status(401);
    throw new Error('Post not found');
  }
});

// @desc Get single post details
// @route GET /api/posts/:id
// @access User
const getPostDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ success: false, message: 'Post was not found' });
  }
});

// @desc Delete single post
// @route GET /api/posts/delete/:id
// @access User
const deletePost = asyncHandler(async (req, res) => {
  const { postId, userId } = req.params;
  const post = await Post.findById(postId);
  const user = await User.findById(userId);

  if (post) {
    await post.remove();
    // user.posts = user.posts.filter(post => post.post !== postId);
    user.posts.pull({ post: postId });
    await user.save();
    res.json({ success: true, message: 'Post was removed' });
  } else {
    res.status(404).json({ success: false, message: 'Post was not found' });
    throw new Error('Post was not found');
  }
});

export {
  getPosts,
  createPost,
  commentPost,
  likePost,
  getPostDetails,
  deletePost,
};
