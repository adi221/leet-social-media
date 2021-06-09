import jwt from 'jsonwebtoken';
import colors from 'colors';
import Chat from '../models/chatModel.js';
import ChatNotification from '../models/chatNotificationModel.js';

// to check online / offline users
const onlineUsersId = {};

const socketServer = socketio => {
  // Authenticate before establishing a socket connection
  socketio
    .use((socket, next) => {
      const token = socket.handshake.query.token;
      if (token) {
        try {
          const user = jwt.verify(token, process.env.JWT_SECRET);

          if (!user) {
            return next(new Error('Not authorized.'));
          }
          socket.user = user;
          return next();
        } catch (err) {
          next(err);
        }
      } else {
        return next(new Error('Not authorized.'));
      }
    })
    .on('connection', socket => {
      socket.join(socket.user.id.toString());
      console.log(`socket connected  ${socket.user.id}`.green.bold);
      if (!onlineUsersId[socket.user.id]) {
        onlineUsersId[socket.user.id] = socket.user.id;
      }
      // console.log(onlineUsersId);

      socket.on('message', async msg => {
        try {
          const { fromUser, toUserId, chatId, message } = msg;
          const chat = await Chat.findById(chatId);

          if (!chat) throw new Error('Could not find chat');

          const newMessage = { fromUser, message };

          chat.messages.push(newMessage);
          await chat.save();

          socketio.sockets
            .in(fromUser.toString())
            .emit('receivedMessage', {
              ...newMessage,
              chatId,
              createdAt: new Date(),
            });

          toUserId.forEach(userId => {
            socketio.sockets
              .in(userId.toString())
              .emit('receivedMessage', {
                ...newMessage,
                chatId,
                createdAt: new Date(),
              });
          });

          // send chatNotification
          for (const userId of toUserId) {
            const userChatNotif = await ChatNotification.findOne({
              user: userId,
            });

            if (userChatNotif) {
              const doesNotificationExist = userChatNotif.unreadChats.some(
                chat => chat.chat.toString() === chatId
              );
              if (doesNotificationExist) return;

              userChatNotif.unreadChats.push({ chat: chatId });
              await userChatNotif.save();
            } else {
              const newChatNotif = new ChatNotification({
                user: userId,
                unreadChats: [{ chat: chatId }],
              });
              await newChatNotif.save();
            }
          }
        } catch (error) {
          console.log(error);
        }
      });

      socket.on('readChat', async ({ chatId, userId }) => {
        try {
          await ChatNotification.updateOne(
            { user: userId },
            { $pull: { unreadChats: { chat: chatId } } }
          );

          socketio.sockets.in(userId.toString()).emit('readChat', chatId);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on('partnerTyping', async receiver => {
        // user is typing if typing is true, otherwise its false
        const { typing, toUserId, fromUser, chatId } = receiver;

        toUserId.forEach(userId => {
          socketio.sockets
            .in(userId.toString())
            .emit('partnerTyping', { chatId, fromUser, typing });
        });
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.user.id}`.brightRed.bold);
        if (onlineUsersId[socket.user.id]) {
          delete onlineUsersId[socket.user.id];
        }
        // console.log(onlineUsersId);
      });
    });
};

export default socketServer;
