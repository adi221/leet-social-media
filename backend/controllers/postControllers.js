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

export { getPosts, createPost };
