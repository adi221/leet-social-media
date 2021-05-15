import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

// @desc Get all posts - from followers and user's posts
// @route GET /api/posts
// @access User
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

// @desc Createa post
// @route POST /api/posts
// @access User
const createPost = asyncHandler(async (req, res) => {
  const { file, tags, description } = req.body;
  const { _id, username } = req.user;

  const post = new Post({
    user: _id,
    username,
    description,
    tags,
    image: file,
    likes: [],
    numLikes: 0,
    comments: [],
    numComments: 0,
  });
  const createdPost = await post.save();
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
  post.numComments = post.comments.length;

  await post.save();

  res.status(201).json({ success: true, message: 'Review added' });
});

// @desc Like or remove like from a post
// @route POST /api/posts/like/:id
// @access User
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (post) {
    const alreadyLikedIndex = post.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    );
    if (alreadyLikedIndex > -1) {
      post.likes.splice(alreadyLikedIndex, 1);
      post.numLikes = post.likes.length;
      await post.save();
    } else {
      post.likes.push({ user: req.user._id, username: req.user.username });
      post.numLikes = post.likes.length;
      await post.save();
    }

    res.status(201).json({
      success: true,
      message: `like ${alreadyLikedIndex > -1 ? 'removed' : 'added'}`,
    });
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

export { getPosts, createPost, commentPost, likePost, getPostDetails };
