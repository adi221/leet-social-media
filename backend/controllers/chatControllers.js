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

  // Add new chat with sockets
  const partner1 = await User.findById(partnerUsersId[0]);

  let partner2;
  if (partnerUsersId.length > 1) {
    partner2 = await User.findById(partnerUsersId[1]);
  }

  let newChatSocket = {
    _id: chat._id,
    partners: [
      {
        _id: partner1._id,
        profileImage: partner1.profileImage,
        username: partner1.username,
      },
    ],
  };

  if (partner2 !== undefined) {
    newChatSocket.partners.push({
      _id: partner2._id,
      profileImage: partner2.profileImage,
      username: partner2.username,
    });
  }

  sendNewChat(req, newChatSocket, _id);

  // send chatId so i can redirect when I get success message
  res.status(201).send(chat._id);
});

// @desc Get chat lists of a user
// @route GET /api/chats/list
// @access User
const getChatList = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  // Needs to add condition if no messages
  // const userChatLists2 = await Chat.aggregate([
  //   // find all user's chats
  //   {
  //     $match: {
  //       chatUsers: {
  //         $elemMatch: {
  //           user: ObjectId(_id),
  //         },
  //       },
  //     },
  //   },
  //   { $sort: { updatedAt: -1 } },
  //   // get last message
  //   { $unwind: '$messages' },
  //   { $sort: { 'messages.createdAt': -1 } },
  //   {
  //     $set: {
  //       totalMessages: { $sum: '$messages' },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: '$_id',
  //       lastMessage: {
  //         $first: {
  //           $cond: {
  //             if: { $eq: ['$totalMessages', 0] },
  //             then: null,
  //             else: '$messages',
  //           },
  //         },
  //       },
  //       data: { $first: '$$ROOT' },
  //     },
  //   },
  //   { $replaceRoot: { newRoot: '$data' } },

  //   // Get partners' image, username
  //   {
  //     $lookup: {
  //       from: 'users',
  //       let: { userId: '$chatUsers.user', currentUserId: ObjectId(_id) },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $in: ['$_id', '$$userId'] },
  //                 { $ne: ['$_id', '$$currentUserId'] },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: 'partnerDetails',
  //     },
  //   },
  //   {
  //     $unwind: '$partnerDetails',
  //   },
  //   {
  //     $project: {
  //       _id: true,
  //       lastMessage: '$messages',
  //       // lastMessage: { $ifNull: ['$messages', null] },
  //       // lastMessage: {
  //       //   $cond: {
  //       //     // if: { $eq: ['$lastMessage', null] },
  //       //     if: { $ifNull: ['$messages', {}] },
  //       //     then: 'lastMessage',
  //       //     else: '$messages',
  //       //   },
  //       // },
  //       'partnerDetails.username': true,
  //       'partnerDetails.profileImage': true,
  //       'partnerDetails._id': true,
  //     },
  //   },
  //   // group after unwinding by group id and push partners into an array '$lastMessage'
  //   {
  //     $group: {
  //       _id: '$_id',
  //       lastMessage: { $first: '$lastMessage' },
  //       partners: {
  //         $push: {
  //           _id: '$partnerDetails._id',
  //           profileImage: '$partnerDetails.profileImage',
  //           username: '$partnerDetails.username',
  //         },
  //       },
  //     },
  //   },
  // ]);
  // console.log(userChatLists2);

  const userChatLists = await Chat.aggregate([
    // find all user's chats
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
    // get last message
    { $unwind: '$messages' },
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

  if (userChatLists) {
    res.send(userChatLists);
  } else {
    res.status(401).json({ success: false, message: 'User has no chat lists' });
  }
});

// @desc Get data for single chat feed
// @route GET /api/chats/:chatId/:offset
// @access User
const getSingleChatData = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { _id } = req.user;

  const chat = await Chat.aggregate([
    // find chat by id
    {
      $match: {
        _id: ObjectId(chatId),
      },
    },
    {
      $addFields: {
        chatType: '$chatType',
        messages: { $slice: ['$messages', -20] },
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
        messages: true,
        chatType: true,
        'partnerDetails.name': true,
        'partnerDetails.username': true,
        'partnerDetails.profileImage': true,
        'partnerDetails._id': true,
      },
    },
    // group after unwinding by group id and push partners into an array
    {
      $group: {
        _id: '$_id',
        chatType: { $first: '$chatType' },
        messages: { $first: '$messages' },
        partners: {
          $push: {
            _id: '$partnerDetails._id',
            profileImage: '$partnerDetails.profileImage',
            username: '$partnerDetails.username',
            name: '$partnerDetails.name',
          },
        },
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

// @desc Get additional messages for feed
// @route GET /api/chats/:chatId/:offset
// @access User
const getAdditionalMessagesChat = asyncHandler(async (req, res) => {
  const { chatId, offset } = req.params;
  const additionalMessages = await Chat.aggregate([
    // find chat by id
    {
      $match: {
        _id: ObjectId(chatId),
      },
    },
    // Sort nested array by created date
    {
      $unwind: '$messages',
    },
    { $sort: { 'messages.createdAt': -1 } },
    { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    // limit and skip with slice - get 20 messages
    {
      $project: {
        messages: {
          $slice: ['$messages', Number(offset), 20],
        },
      },
    },
  ]);

  if (additionalMessages) {
    // returns an array
    res.json(additionalMessages[0].messages);
  } else {
    res.status(201).json({ success: false, message: 'No more messages' });
  }
});

export {
  getChatList,
  createChat,
  getSingleChatData,
  getAdditionalMessagesChat,
};
