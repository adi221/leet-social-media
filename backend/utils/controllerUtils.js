import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

/**
 * @function getCommentsOfPost
 * @param {string} postId
 * @param {number} offset
 * @param {number} exclude
 * @returns {array} array of first 10 comments and total comments count
 */
export const getCommentsOfPost = async (postId, offset = 0, exclude = 0) => {
  try {
    const commentsAggregation = await Comment.aggregate([
      {
        $facet: {
          comments: [
            { $match: { post: ObjectId(postId) } },
            // sort the newest comments to the top
            // { $sort: { createdAt: -1 } },
            // Skip the comments we do not want
            // This is desireable in the even that a comment has been created
            // and stored locally, we'd not want duplicate comments
            // { $skip: Number(exclude) },
            // get 10 last comments and then resort comments to ascending order
            { $skip: Number(offset) },
            // { $limit: 10 },
            // { $sort: { createdAt: 1 } },
            {
              $lookup: {
                from: 'commentreplies',
                localField: '_id',
                foreignField: 'parentComment',
                as: 'commentReplies',
              },
            },
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
              $addFields: {
                commentRepliesCount: { $size: '$commentReplies' },
                commentReplies: [],
              },
            },
            {
              $project: {
                createdAt: true,
                comment: true,
                commentLikes: true,
                commentReplies: true,
                commentRepliesCount: true,
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

/**
 * retrieves user details by username
 * @function findUserDetails
 * @param {string} username
 * @returns {Object} user details
 */
export const findUserDetails = async username => {
  try {
    const user = await User.find({ username }, '_id');
    // if empty returns undefined
    if (user[0] && user[0]._id) {
      return user[0]._id.toString();
    } else {
      return undefined;
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * retrieve related users i.e following and followers and users that like a post
 * @function getRelatedUsers
 * @param {array} users array of users
 * @param {number} offset number of users to skip
 */
export const getRelatedUsers = async (users, offset) => {
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

/**
 * checks if chat already exists, if yes so don't open new and redirect chatId
 * @function doesChatAlreadyExist
 * @param {string} fromUserId the users that sent the message
 * @param {string} toUserId receiver
 */
export const doesChatAlreadyExist = async (fromUserId, toUserId) => {
  const commonChat = await Chat.aggregate([
    {
      $match: {
        $and: [
          { chatType: 'dual' },
          {
            chatUsers: {
              $elemMatch: {
                user: ObjectId(fromUserId),
              },
            },
          },
          {
            chatUsers: {
              $elemMatch: {
                user: ObjectId(toUserId),
              },
            },
          },
        ],
      },
    },
  ]);

  if (commonChat.length > 0) {
    const chatId = commonChat[0]._id.toString();
    // show chat for sender if is hidden
    await Chat.updateOne(
      { _id: chatId, 'chatUsers.user': fromUserId },
      { $set: { 'chatUsers.$.showChat': true } }
    );

    return chatId;
  } else {
    return false;
  }
};

/**
 * get single chat for user if chat is not shown in the list
 * @function getSingleChatForList
 * @param {object} chatAndUserId chatId of the chat to retrieve and userId of user
 */
export const getSingleChatForList = async chatAndUserId => {
  const { chatId, currentUserId } = chatAndUserId;

  let chat = await Chat.aggregate([
    // find chat by id
    {
      $match: {
        _id: ObjectId(chatId),
      },
    },
    // get last message
    { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
    { $sort: { 'messages.createdAt': -1 } },
    {
      $group: {
        _id: '$_id',
        lastMessage: { $first: '$messages' },
        data: { $first: '$$ROOT' },
      },
    },
    { $replaceRoot: { newRoot: '$data' } },
    // Get partners' image, username
    {
      $lookup: {
        from: 'users',
        let: {
          userId: '$chatUsers.user',
          currentUserId: ObjectId(currentUserId),
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ['$_id', '$$userId'] },
                  { $ne: ['$_id', '$$currentUserId'] },
                ],
              },
            },
          },
        ],
        as: 'partnerDetails',
      },
    },
    {
      $unwind: '$partnerDetails',
    },
    {
      $project: {
        _id: true,
        lastMessage: '$messages',
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
    // group after unwinding by group id and push partners into an array
    {
      $group: {
        _id: '$_id',
        lastMessage: { $first: '$lastMessage' },
        partners: {
          $push: {
            _id: '$partnerDetails._id',
            profileImage: '$partnerDetails.profileImage',
            username: '$partnerDetails.username',
          },
        },
      },
    },
    { $sort: { 'lastMessage.createdAt': -1 } },
  ]);
  // aggregate returns an array
  chat = chat[0];

  // set showChat to all partners including the current user
  const chatPartnersId = chat.partners.map(partner => ObjectId(partner._id));
  chatPartnersId.push(currentUserId);

  await Chat.updateMany(
    {
      _id: chatId,
      chatUsers: { $elemMatch: { user: { $in: chatPartnersId } } },
    },
    { $set: { 'chatUsers.$.showChat': true } }
  );

  return chat;
};
