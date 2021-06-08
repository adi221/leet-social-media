import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import { sendNewChat } from '../handlers/socketHandlers.js';

// @desc Create chat
// @route POST /api/chats
// @access User
const createChat = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { partnerUsersId } = req.body;

  let chat;
  if (partnerUsersId.length === 0) {
    return res.status(401).json({ success: false, message: 'No partner user' });
  } else if (partnerUsersId.length === 1) {
    const doesChatAlreadyExist = async () => {
      const userChats = await Chat.aggregate([
        {
          $match: {
            $and: [
              { chatType: 'dual' },
              {
                chatUsers: {
                  $elemMatch: {
                    user: ObjectId(_id),
                  },
                },
              },
              {
                chatUsers: {
                  $elemMatch: {
                    user: ObjectId(partnerUsersId[0]),
                  },
                },
              },
            ],
          },
        },
      ]);

      if (userChats.length > 0) {
        return userChats[0]._id.toString();
      } else {
        return false;
      }
    };

    const doesChatExist = await doesChatAlreadyExist();
    if (doesChatExist) {
      // doesChatExist = chatId to redirect
      return res.send(doesChatExist);
    }

    const chatUsers = [{ user: _id }, { user: partnerUsersId[0] }];
    chat = new Chat({ chatUsers, messages: [], chatType: 'dual' });
    await chat.save();
  } else {
    const chatUsers = [{ user: _id }];
    partnerUsersId.forEach(id => chatUsers.push({ user: id }));
    chat = new Chat({ chatUsers, messages: [], chatType: 'group' });
    await chat.save();
  }

  /*
  const partner = await User.findById(partnerUsersId[0]);
  const newChatSocket = {
    _id: chat._id,
    partnerDetails: {
      _id: partner._id,
      profileImage: partner.profileImage,
      username: partner.username,
    },
  };

  sendNewChat(req, newChatSocket, _id);
  */

  // send chatId so i can redirect when I get success message
  res.status(201).send(chat._id);
});

// @desc Get chat lists of a user
// @route GET /api/chats/list
// @access User
const getChatList = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  // db.chat.chatUsers.user
  const userChatLists2 = await Chat.aggregate([
    {
      $match: {
        chatUsers: {
          $elemMatch: {
            user: ObjectId(_id),
          },
        },
      },
    },
    { $sort: { updatedAt: -1 } },
    // Get partner's image, username
    {
      $lookup: {
        from: 'users',
        let: { userId: '$chatUsers.user', currentUserId: ObjectId(_id) },
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
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
    {
      $group: {
        _id: '$_id',
        partners: {
          $push: {
            _id: '$partnerDetails._id',
            profileImage: '$partnerDetails.profileImage',
            username: '$partnerDetails.username',
          },
        },
      },
    },
  ]);
  console.log(userChatLists2);
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
    { $sort: { updatedAt: -1 } },
    // Get partner's image, username
    {
      $lookup: {
        from: 'users',
        let: { userId: '$chatUsers.user', currentUserId: ObjectId(_id) },
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
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
  ]);

  if (userChatLists) {
    res.send(userChatLists2);
  } else {
    res.status(401).json({ success: false, message: 'User has no chat lists' });
  }
});

// @desc Get data for single chat feed
// @route GET /api/chats/:chatId
// @access User
const getSingleChatData = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { _id } = req.user;
  const chat = await Chat.aggregate([
    {
      $match: {
        _id: ObjectId(chatId),
      },
    },
    // Get partner's image, username
    {
      $lookup: {
        from: 'users',
        let: { userId: '$chatUsers.user', currentUserId: ObjectId(_id) },
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
        chatType: true,
        messages: true,
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
  ]);
  if (chat) {
    // returns an array
    res.json(chat[0]);
  } else {
    res
      .status(404)
      .json({ success: false, message: 'Chat not found by its id' });
  }
});

export { getChatList, createChat, getSingleChatData };
