export const sendNotification = (req, notification) => {
  const socketio = req.app.get('socketio');
  socketio.sockets
    .in(notification.receiver.toString())
    .emit('newNotification', notification);
};

export const sendNewChat = (req, chat, receiver) => {
  const socketio = req.app.get('socketio');
  socketio.sockets.in(receiver.toString()).emit('newChat', chat);
};
