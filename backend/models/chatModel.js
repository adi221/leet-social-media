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
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    messageType: {
      type: String,
      default: 'text',
      enum: ['text', 'post'],
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
