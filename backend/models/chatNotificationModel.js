import mongoose from 'mongoose';

const chatNotificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  unreadChats: [
    {
      chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    },
  ],
});

const ChatNotification = mongoose.model(
  'ChatNotification',
  chatNotificationSchema
);
export default ChatNotification;
