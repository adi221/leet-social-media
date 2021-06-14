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

export const addNewGroupMembers = (req, newMembers, receiver) => {
  const socketio = req.app.get('socketio');
  socketio.sockets.in(receiver.toString()).emit('newGroupMember', newMembers);
};

export const removeGroupMember = (req, chatId, receiver) => {
  const socketio = req.app.get('socketio');
  socketio.sockets.in(receiver.toString()).emit('removeGroupMember', chatId);
};

export const hideChatFromList = (req, chatId, receiver) => {
  const socketio = req.app.get('socketio');
  socketio.sockets.in(receiver.toString()).emit('hideChatFromList', chatId);
};
