import io from 'socket.io-client';
import { CONNECT, DISCONNECT } from '../constants/socketConstants';
import { addNotification } from '../actions/notificationActions';
import { receivedMessage, addChat } from '../actions/chatActions';

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

  socket.on('newChat', chat => {
    dispatch(addChat(chat));
  });

  socket.on('receivedMessage', message => {
    dispatch(receivedMessage(message));
  });
};

export const disconnectSocket = () => ({ type: DISCONNECT });
