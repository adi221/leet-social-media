import {
  GET_CHAT_LISTS_REQUEST,
  GET_CHAT_LISTS_SUCCESS,
  GET_CHAT_LISTS_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
} from '../constants/chatConstants';

export const createChatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return { ...state, loading: true };
    case CREATE_CHAT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatListsReducer = (state = { chatLists: [] }, action) => {
  switch (action.type) {
    case GET_CHAT_LISTS_REQUEST:
      return { ...state, loading: true };
    case GET_CHAT_LISTS_SUCCESS:
      return { loading: false, chatLists: action.payload };
    case GET_CHAT_LISTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
