import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

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
    numLikes: 0,
    comments: [],
    numComments: 0,
  });
  const createdPost = await post.save();

  user.posts.push({ post: post._id });
  user.numPosts = user.posts.length;
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
  post.numComments = post.comments.length;

  await post.save();

  res.status(201).json({ success: true, message: 'Review added' });
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
      post.numLikes = post.likes.length;
      await post.save();
      user.likedPosts = user.likedPosts.filter(
        p => p.post.toString() !== post._id.toString()
      );
      user.numLikedPosts = user.likedPosts.length;
      await user.save();
    } else {
      post.likes.push({ user: _id, username });
      post.numLikes = post.likes.length;
      await post.save();
      user.likedPosts.push({ post: post._id });
      user.numLikedPosts = user.likedPosts.length;
      await user.save();
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

// @desc Delete single post
// @route GET /api/posts/delete/:id
// @access User
const deletePost = asyncHandler(async (req, res) => {
  const { postId, userId } = req.params;
  const post = await Post.findById(postId);
  const user = await User.findById(userId);

  if (post) {
    await post.remove();
    // user.posts.filter(post => post.post !== postId);
    user.posts.pull({ post: postId });
    user.numPosts = user.posts.length;
    await user.save();
    console.log(user);
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
