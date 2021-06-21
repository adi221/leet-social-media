import mongoose from 'mongoose';

const commentReplySchema = mongoose.Schema(
  {
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Comment',
    },
    message: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    replyLikes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CommentReply = mongoose.model('CommentReply', commentReplySchema);
export default CommentReply;
