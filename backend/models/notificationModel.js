import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    notificationType: {
      type: String,
      enum: ['follow', 'like', 'comment', 'mention'],
    },
    notificationData: Object,
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
