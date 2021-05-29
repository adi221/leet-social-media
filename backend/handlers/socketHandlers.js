export const sendNotification = (req, notification) => {
  const io = req.app.get('socketIo');
  io.sockets.in(notification.receiver).emit('newNotification', notification);
};
