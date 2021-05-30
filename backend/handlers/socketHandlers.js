export const sendNotification = (req, notification) => {
  const io = req.app.get('socketio');
  io.sockets
    .in(notification.receiver.toString())
    .emit('newNotification', notification);
};
