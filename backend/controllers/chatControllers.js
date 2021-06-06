import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// @desc Create chat
// @route POST /api/chats
// @access User
const createChat = asyncHandler(async (req, res) => {
  // check if chat is already exists between two users
  // if not - create a new chat
  // else redirect by sending res.send(chat._id)
  const { _id } = req.user;
  const { partnerUsersId } = req.body;
  let chat;

  if (partnerUsersId.length === 0) {
    res.status(401).json({ success: false, message: 'No partner user' });
  } else if (partnerUsersId.length === 1) {
    const chatUsers = [{ user: _id }, { user: partnerUsersId[0] }];
    chat = new Chat({ chatUsers, messages: [], chatType: 'dual' });
    await chat.save();
  } else {
    const chatUsers = [{ user: _id }];
    partnerUsersId.forEach(id => chatUsers.push({ user: id }));
    chat = new Chat({ chatUsers, messages: [], chatType: 'group' });
    await chat.save();
  }

  res.status(201).send(chat._id);
});

// @desc Get chat lists of a user
// @route GET /api/chats/list
// @access User
const getChatList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  // const userChatLists = await Chat.find({ 'user.chatUsers.user': _id });

  // db.chat.chatUsers.user
  const userChatLists = await Chat.aggregate([
    {
      $match: {
        chatUsers: {
          $elemMatch: {
            user: ObjectId(_id),
          },
        },
      },
    },
    { $sort: { createdAt: -1 } },
    // Get partner's image, username
    {
      $lookup: {
        from: 'users',
        let: { userId: '$chatUsers.user' },
        pipeline: [
          {
            $match: {
              $expr: {
                $ne: ['$$userId', ObjectId(_id)],
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
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
  ]);

  console.log(userChatLists);

  /*
  const userChatLists = await Chat.aggregate([
    {
      $match: {
        chatUsers: {
          $elemMatch: {
            user: ObjectId(_id),
          },
        },
      },
    },
    { $sort: { createdAt: -1 } },
    // Get partner's image, username
    {
      $lookup: {
        from: 'users',
        localField: 'chatUsers.user',
        foreignField: '_id',
        as: 'partnerDetails',
      },
    },
    {
      $unwind: '$partnerDetails',
    },
    {
      $project: {
        _id: true,
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
  ]);
  */
  // find query to skip the user._id in the localField
  // const filteredUserChatList = userChatLists.filter(
  //   chat => chat._id !== _id.toString()
  // );
  // console.log(filteredUserChatList);
  if (userChatLists) {
    res.json(userChatLists);
  } else {
    res.status(401).json({ success: false, message: 'User has no chat lists' });
  }
});

export { getChatList, createChat };
