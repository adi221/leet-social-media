import { CONNECT, DISCONNECT } from '../constants/socketConstants';

export const socketReducer = (state = { socket: null }, action) => {
  switch (action.type) {
    case CONNECT:
      return { socket: action.payload };
    case DISCONNECT:
      state.socket && state.socket.disconnect();
      return { socket: null };
    default:
      return state;
  }
};
