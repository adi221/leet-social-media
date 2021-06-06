import {
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  CHANGE_CHAT_PARTNERS,
  RESET_CHAT_PARTNERS,
} from '../constants/chatConstants';

export const createChatReducer = (state = { partnerUsersId: [] }, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return { ...state, loading: true };
    case CREATE_CHAT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case CHANGE_CHAT_PARTNERS:
      return { ...state, partnerUsersId: action.payload };
    case RESET_CHAT_PARTNERS:
      return { ...state, partnerUsersId: [] };
    default:
      return state;
  }
};

export const chatListReducer = (state = { chatList: [] }, action) => {
  switch (action.type) {
    case GET_CHAT_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_CHAT_LIST_SUCCESS:
      return { loading: false, chatLists: action.payload };
    case GET_CHAT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
