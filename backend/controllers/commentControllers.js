import asyncHandler from 'express-async-handler';
import Comment from '../models/commentModel.js';
import CommentReply from '../models/commentReplyModel.js';
import Post from '../models/postModel.js';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';
import { sendNotification } from '../handlers/socketHandlers.js';
import { resizeImage } from '../handlers/imageResizeHandlers.js';
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
  const user = await User.findById(_id);

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
        postId: id,
        postImage: resizedImage,
        comment,
      },
    });
    await notification.save();

    sendNotification(req, {
      ...notification.toObject(),
      senderDetails: {
        _id: req.user._id,
        username: user.username,
        profileImage: user.profileImage,
      },
    });
  }

  res.status(201).json({
    ...newComment.toObject(),
    author: { username: user.username, profileImage: user.profileImage },
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

export { createComment, likeComment };
