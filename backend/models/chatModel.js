import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      default: 'message',
      enum: ['message', 'post'],
    },
  },
  { timestamps: true }
);

const chatSchema = mongoose.Schema(
  {
    chatUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        showChat: {
          type: Boolean,
          default: true,
        },
      },
    ],
    messages: [messageSchema],
    chatType: {
      type: String,
      default: 'dual',
      enum: ['dual', 'group'],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
