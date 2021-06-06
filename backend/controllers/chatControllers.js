import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// @desc Create chat
// @route POST /api/chats/:partnderId
// @access User
const createChat = asyncHandler(async (req, res) => {
  // check if chat is already exists between two users
  // if not - create a new chat
  const { partnderId } = req.params;
  const { _id } = req.user;

  const chatUsers = [{ user: _id }, { user: partnderId }];

  const chat = new Chat({ chatUsers, messages: [] });
  await chat.save();

  res.send('Succeeded creating');
});

// @desc Get chat lists of a user
// @route GET /api/chats/lists
// @access User
const getChatLists = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userChatLists = await Chat.find({ user: { $in: chatUsers } });
  if (userChatLists) {
    res.json(userChatLists);
  } else {
    res.status(201).json({ success: false, message: 'User has no chat lists' });
  }
});

export { getChatLists, createChat };
