import {
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  CHANGE_CHAT_PARTNERS,
  RESET_CHAT_PARTNERS,
  GET_CHAT_FEED_REQUEST,
  GET_CHAT_FEED_FAIL,
  GET_CHAT_FEED_SUCCESS,
  RECEIVED_MESSAGE,
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
      return { loading: false, chatList: action.payload };
    case GET_CHAT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const chatFeedInitialState = {
  loading: true,
  error: false,
  chatPartners: [
    {
      _id: '',
      username: '',
      profileImage: '',
    },
  ],
  chatType: '',
  messages: [],
  textInput: '',
};
export const chatFeedReducer = (state = chatFeedInitialState, action) => {
  switch (action.type) {
    case GET_CHAT_FEED_REQUEST:
      return { ...state, loading: true };
    case GET_CHAT_FEED_FAIL:
      return { ...state, loading: false, error: true };
    case GET_CHAT_FEED_SUCCESS:
      const { chatType, messages, partnerDetails } = action.payload;
      if (chatType === 'dual') {
        return {
          ...state,
          loading: false,
          messages,
          chatType,
          chatPartners: { ...partnerDetails },
        };
      }
      return { ...state };
    case RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};
