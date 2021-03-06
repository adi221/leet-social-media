import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
    commentLikes: [
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

commentSchema.pre('deleteOne', async function (next) {
  const commentId = this.getQuery()['_id'];
  try {
    await mongoose
      .model('CommentReply')
      .deleteMany({ parentComment: commentId });
    next();
  } catch (err) {
    next(err);
  }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
