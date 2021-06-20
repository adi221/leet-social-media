import io from 'socket.io-client';
import { CONNECT, DISCONNECT } from '../constants/socketConstants';
import {
  addNotification,
  addChatNotification,
  readChatNotification,
} from '../actions/notificationActions';
import {
  receivedMessage,
  addChat,
  partnerTyping,
  updateLastMessage,
  addNewGroupMembers,
  removeChatFromList,
} from '../actions/chatActions';
import { sharePostSuccess, addNewPost } from '../actions/postActions';

// connect to socket
const connect = token => {
  const socket = io('http://localhost:5000', {
    query: { token },
  });
  return socket;
};

export const connectSocket = () => (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const socket = connect(userInfo.token);
  dispatch({ type: CONNECT, payload: socket });

  socket.on('newNotification', data => {
    dispatch(addNotification(data));
  });

  socket.on('newPost', newPostId => {
    dispatch(addNewPost(newPostId));
  });

  socket.on('newChat', chat => {
    dispatch(addChat(chat));
  });

  socket.on('receivedMessage', message => {
    const {
      chatList: { chatList },
    } = getState();

    // if chat is not shown yet - maybe it`s hidden by user or message for first time or chat not loaded yet
    if (!chatList.some(chat => chat._id === message.chatId)) {
      const {
        socket: { socket },
        userLogin: { userInfo },
      } = getState();
      socket.emit('getChat', {
        chatId: message.chatId,
        currentUserId: userInfo._id,
      });
      dispatch(addChatNotification(message.chatId, message.fromUser));
      return;
    }

    dispatch(receivedMessage(message));
    dispatch(addChatNotification(message.chatId, message.fromUser));
    dispatch(updateLastMessage(message));
  });

  socket.on('partnerTyping', chatPartnerTyping => {
    dispatch(partnerTyping(chatPartnerTyping));
  });

  socket.on('readChat', chatId => {
    dispatch(readChatNotification(chatId));
  });

  socket.on('newGroupMember', newMembers => {
    dispatch(addNewGroupMembers(newMembers));
  });

  socket.on('removeGroupMember', chatId => {
    dispatch(removeChatFromList(chatId));
  });

  socket.on('hideChatFromList', chatId => {
    dispatch(removeChatFromList(chatId));
  });

  socket.on('successPostMessage', () => {
    dispatch(sharePostSuccess());
    // Add alert
  });
};

export const disconnectSocket = () => ({ type: DISCONNECT });
