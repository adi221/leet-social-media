import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// @desc Get notifications of a user
// @route GET /api/notifications/:id
// @access User
const getNotifications = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notifications = await Notification.aggregate([
    {
      $match: { receiver: ObjectId(id) },
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

export { getNotifications, readNotification };
