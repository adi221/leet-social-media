import asyncHandler from 'express-async-handler';
import Comment from '../models/commentModel.js';
import CommentReply from '../models/commentReplyModel.js';
import Post from '../models/postModel.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';
import { sendNotification } from '../handlers/socketHandlers.js';
import { resizeImage } from '../handlers/imageResizeHandlers.js';
import { getCommentsOfPost } from '../utils/controllerUtils.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// @desc Create new comment for post
// @route POST /api/comments/:postId
// @access User
const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { postId } = req.params;
  const { _id } = req.user;

  const post = await Post.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: 'Post was not found' });
  }

  const newComment = new Comment({
    post: postId,
    user: _id,
    comment,
    commentLikes: [],
  });
  await newComment.save();

  if (!newComment) {
    return res
      .status(401)
      .json({ success: false, message: 'Could not create a new comment' });
  }

  // Send notification to post owner if he did not write the comment
  if (post.user.toString() !== _id.toString()) {
    const resizedImage = await resizeImage(post.image, 50, 50);

    const notification = new Notification({
      sender: req.user._id,
      receiver: post.user,
      notificationType: 'comment',
      notificationData: {
        postId,
        postImage: resizedImage,
        comment,
      },
    });
    await notification.save();

    sendNotification(req, {
      ...notification.toObject(),
      senderDetails: {
        _id: req.user._id,
        username: req.user.username,
        profileImage: req.user.profileImage,
      },
    });
  }

  res.status(201).json({
    ...newComment.toObject(),
    author: {
      username: req.user.username,
      profileImage: req.user.profileImage,
    },
  });
});

// @desc Like a comment of post
// @route POST /api/comments/like/:commentId
// @access User
const likeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { _id } = req.user;

  const comment = await Comment.findById(commentId);

  if (comment) {
    const alreadyLikeIndex = comment.commentLikes.findIndex(
      like => like.user.toString() === _id.toString()
    );

    if (alreadyLikeIndex > -1) {
      comment.commentLikes.splice(alreadyLikeIndex, 1);
      await comment.save();
    } else {
      comment.commentLikes.push({ user: _id });
      await comment.save();

      // TODO: Send notification for like comment
      // const user = await User.findById(_id);
    }
    return res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Comment not found' });
  }
});

// @desc Get comments of a certain post
// @route GET /api/comments/:postId/:offset/:exclude
// @access User
const getComments = asyncHandler(async (req, res) => {
  //  exclude
  const { postId, offset } = req.params;
  const comments = await getCommentsOfPost(postId, offset);
  if (comments) {
    res.send(comments);
  } else {
    res.send([]);
  }
});

// @desc Create comment reply for a certain comment
// @route POST /api/comments/reply/:parentCommentId
// @access User
const createCommentReply = asyncHandler(async (req, res) => {
  const { parentCommentId } = req.params;
  const { commentReply } = req.body;
  const { _id } = req.user;

  const comment = await Comment.findById(parentCommentId);

  if (!comment) {
    return res
      .status(401)
      .json({ success: false, message: 'comment id is incorrect' });
  }

  const newCommentReply = new CommentReply({
    parentComment: parentCommentId,
    message: commentReply,
    user: _id,
    replyLikes: [],
  });
  await newCommentReply.save();

  res.status(201).json({
    ...newCommentReply.toObject(),
    author: {
      username: req.user.username,
      profileImage: req.user.profileImage,
    },
  });
});

// @desc Get comment replies of a comment
// @route GET /api/comments/replies/:parentCommentId/:offset
// @access User
const getCommentReplies = asyncHandler(async (req, res) => {
  const { parentCommentId, offset = 0 } = req.params;

  const comment = await Comment.findById(parentCommentId);
  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: 'No comment found' });
  }

  const commentReplies = await CommentReply.aggregate([
    { $match: { parentComment: ObjectId(parentCommentId) } },
    { $sort: { createdAt: -1 } },
    { $skip: Number(offset) },
    { $limit: 3 },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'author',
      },
    },
    { $unwind: '$author' },
    {
      $project: {
        parentComment: true,
        createdAt: true,
        message: true,
        replyLikes: true,
        'author.username': true,
        'author.profileImage': true,
        'author._id': true,
      },
    },
  ]);

  if (commentReplies.length === 0) {
    res
      .status(401)
      .json({ success: false, message: 'No message replies found' });
  } else {
    res.send(commentReplies);
  }
});

// @desc Like a comment reply
// @route POST /api/comments/like/reply/:commentReplyId
// @access User
const likeCommentReply = asyncHandler(async (req, res) => {
  const { commentReplyId } = req.params;
  const { _id } = req.user;

  const commentReply = await CommentReply.findById(commentReplyId);

  if (commentReply) {
    const alreadyLikeIndex = commentReply.replyLikes.findIndex(
      like => like.user.toString() === _id.toString()
    );

    if (alreadyLikeIndex > -1) {
      commentReply.replyLikes.splice(alreadyLikeIndex, 1);
      await commentReply.save();
    } else {
      commentReply.replyLikes.push({ user: _id });
      await commentReply.save();

      // TODO: Send notification for like comment
      // const user = await User.findById(_id);
    }
    return res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Comment not found' });
  }
});

// @desc Delete a comment
// @route DELETE /api/comments/:commentId
// @access User
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  console.log(req.user._id, commentId);

  const comment = await Comment.findOne({
    _id: commentId,
  });

  if (!comment) {
    return res
      .status(404)
      .send({ success: false, message: 'Comment was not found' });
  }

  // remove comment replies attached to comment and comment itself
  await CommentReply.deleteMany({ parentComment: commentId });
  await Comment.deleteOne({ _id: commentId });

  res.status(204).json({ success: true, message: 'Comment deleted' });
});

// @desc Delete a comment
// @route DELETE /api/comments/reply/:commentReplyId
// @access User
const deleteCommentReply = asyncHandler(async (req, res) => {
  const { commentReplyId } = req.params;

  const commentReply = await CommentReply.findOne({
    _id: commentReplyId,
  });

  if (!commentReply) {
    return res
      .status(404)
      .send({ success: false, message: 'Comment reply was not found' });
  }

  await CommentReply.deleteOne({ _id: commentReplyId });

  res.status(204).json({ success: true, message: 'Comment deleted' });
});

export {
  createComment,
  likeComment,
  getComments,
  createCommentReply,
  getCommentReplies,
  likeCommentReply,
  deleteComment,
  deleteCommentReply,
};
