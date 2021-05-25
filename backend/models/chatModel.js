import mongoose from 'mongoose';

const chatUserSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

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
  },
  { timestamps: true }
);

const chatSchema = mongoose.Schema(
  {
    chatUsers: [chatUserSchema],
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
