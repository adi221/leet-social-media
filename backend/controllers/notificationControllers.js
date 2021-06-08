import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';
import ChatNotification from '../models/chatNotificationModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// @desc Get notifications of a user
// @route GET /api/notifications/:id
// @access User
const getNotifications = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const notifications = await Notification.aggregate([
    {
      $match: { receiver: ObjectId(_id) },
    },
    { $sort: { createdAt: -1 } },
    // Get sender's image, username
    {
      $lookup: {
        from: 'users',
        localField: 'sender',
        foreignField: '_id',
        as: 'senderDetails',
      },
    },
    {
      $unwind: '$senderDetails',
    },
    {
      $project: {
        _id: true,
        read: true,
        notificationType: true,
        createdAt: true,
        notificationData: true,
        'senderDetails.username': true,
        'senderDetails.profileImage': true,
        'senderDetails._id': true,
      },
    },
  ]);

  if (notifications) {
    res.send(notifications);
  } else {
    res
      .status(201)
      .json({ success: false, message: 'Unable to get notifications' });
  }
});

// @desc Updating that user read notifications
// @route PUT /api/notifications
// @access User
const readNotification = asyncHandler(async (req, res) => {
  if (req.user) {
    await Notification.updateMany({ receiver: req.user._id }, { read: true });
    res.json({ success: true, message: 'Notification was read' });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// @desc Get chat notifications of a user
// @route GET /api/notifications/chat
// @access User
const getChatNotifications = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const userChatNotifications = await ChatNotification.aggregate([
    { $match: { user: ObjectId(_id) } },
    { $limit: 1 },
    { $project: { unreadChats: true } },
  ]);

  const userChatIds = userChatNotifications[0].unreadChats.map(
    chat => chat.chat
  );

  if (userChatNotifications) {
    res.send(userChatIds);
  } else {
    // send empty array because user has no document yet
    res.send([]);
  }
});

export { getNotifications, readNotification, getChatNotifications };
