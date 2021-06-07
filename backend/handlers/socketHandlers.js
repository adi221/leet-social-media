export const sendNotification = (req, notification) => {
  const socketio = req.app.get('socketio');
  socketio.sockets
    .in(notification.receiver.toString())
    .emit('newNotification', notification);
};
