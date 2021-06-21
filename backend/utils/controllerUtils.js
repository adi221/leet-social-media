import Comment from '../models/commentModel.js';
import CommentReply from '../models/commentReplyModel.js';
import Post from '../models/postModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getCommentsOfPost = async (postId, offset = 0) => {
  try {
    const commentsAggregation = await Comment.aggregate([
      {
        $facet: {
          comments: [
            { $match: { post: ObjectId(postId) } },
            // sort the newest comments to the top
            { $sort: { createdAt: -1 } },
            // get 10 last comments and then resort comments to ascending order
            { $skip: Number(offset) },
            { $limit: 10 },
            { $sort: { createdAt: 1 } },
            // {
            //   $lookup: {
            //     from: 'commentreplies',
            //     localField: '_id',
            //     foreignField: 'parentComment',
            //     as: 'commentReplies',
            //   },
            // },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'author',
              },
            },
            { $unwind: '$author' },
            // { $addFields: { commentReplies: { $size: '$commentReplies' } } },
            {
              $project: {
                createdAt: true,
                comment: true,
                commentLikes: true,
                'author.username': true,
                'author.profileImage': true,
                'author._id': true,
              },
            },
          ],
          commentCount: [
            {
              $match: { post: ObjectId(postId) },
            },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],
        },
      },
      {
        $unwind: '$commentCount',
      },
      {
        $addFields: {
          commentCount: '$commentCount.count',
        },
      },
    ]);

    // Meaning no comments yet
    if (commentsAggregation.length === 0) {
      return { comments: [], commentCount: 0 };
    } else {
      return commentsAggregation[0];
    }
  } catch (error) {
    throw new Error(error);
  }
};
