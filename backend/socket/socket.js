import * as io from 'socket.io';
import jwt from 'jsonwebtoken';
import colors from 'colors';
import Chat from '../models/chatModel.js';

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
            .emit('receivedMessage', newMessage);
          socketio.sockets
            .in(toUserId.toString())
            .emit('receivedMessage', newMessage);
        } catch (error) {
          console.log(error);
        }
      });
    });
};

export default socketServer;
