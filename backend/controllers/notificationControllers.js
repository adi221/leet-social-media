import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';

// @desc Get notifications of a user
// @route GET /api/notifications
// @access User
const getNotifications = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notifications = await Notification.find({ receiver: id });

  if (notifications) {
    return res.send(notifications);
  } else {
    res.status({ success: false, message: 'Unable to get notifications' });
  }
});

// @desc Updating that user read notifications
// @route PUT /api/notifications
// @access User
const readNotification = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (user) {
    await Notification.updateMany({ receiver: _id }, { read: true });
    res.json({ success: true, message: 'Notification was read' });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

export { getNotifications, readNotification };
