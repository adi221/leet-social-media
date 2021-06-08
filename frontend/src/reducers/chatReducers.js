import {
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAIL,
  ADD_CHAT,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  CHANGE_CHAT_PARTNERS,
  RESET_CHAT_PARTNERS,
  RESET_CHAT_REDIRECT,
  GET_CHAT_FEED_REQUEST,
  GET_CHAT_FEED_FAIL,
  GET_CHAT_FEED_SUCCESS,
  RECEIVED_MESSAGE,
  PARTNER_TYPING,
} from '../constants/chatConstants';

export const createChatReducer = (
  state = { partnerUsersId: [], redirectChatId: null },
  action
) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return { ...state, loading: true };
    case CREATE_CHAT_SUCCESS:
      return { ...state, loading: false, redirectChatId: action.payload };
    case CREATE_CHAT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CHANGE_CHAT_PARTNERS:
      return { ...state, partnerUsersId: action.payload };
    case RESET_CHAT_PARTNERS:
      return { ...state, partnerUsersId: [] };
    case RESET_CHAT_REDIRECT:
      return { ...state, redirectChatId: null };
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
    case ADD_CHAT:
      return { ...state, chatList: [action.payload, ...state.chatList] };
    default:
      return state;
  }
};

const chatFeedInitialState = {
  loading: true,
  error: false,
  currentChatId: '',
  partners: [
    {
      _id: '',
      username: '',
      profileImage: '',
    },
  ],
  chatType: '',
  messages: [],
  chatPartnersTyping: [],
};
export const chatFeedReducer = (state = chatFeedInitialState, action) => {
  switch (action.type) {
    case GET_CHAT_FEED_REQUEST:
      return { ...state, loading: true };
    case GET_CHAT_FEED_FAIL:
      return { ...state, loading: false, error: true };
    case GET_CHAT_FEED_SUCCESS:
      const { chatType, messages, partners, _id } = action.payload;
      return {
        ...state,
        loading: false,
        messages,
        chatType,
        partners,
        currentChatId: _id,
      };
    case RECEIVED_MESSAGE:
      const { fromUser, message, chatId } = action.payload;
      // if chatId doesnt equal current chatId shown to user don't add new message
      if (chatId === state.currentChatId) {
        return {
          ...state,
          messages: [...state.messages, { fromUser, message }],
        };
      }
      return state;
    case PARTNER_TYPING:
      // filter any typing status from partnersArr and then add if typing true
      const currentPartnerTyping = action.payload;

      const modifiedTypingPartners = state.chatPartnersTyping.filter(
        partner => partner.chatId !== currentPartnerTyping.chatId
      );

      if (currentPartnerTyping.typing) {
        modifiedTypingPartners.push(currentPartnerTyping);
      }

      return {
        ...state,
        chatPartnersTyping: modifiedTypingPartners,
      };
    default:
      return state;
  }
};
