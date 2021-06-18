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
  UPDATE_LAST_MESSAGE,
  GET_CHAT_FEED_REQUEST,
  GET_CHAT_FEED_FAIL,
  GET_CHAT_FEED_SUCCESS,
  RECEIVED_MESSAGE,
  PARTNER_TYPING,
  GET_ADDITIONAL_MESSAGES_REQUEST,
  GET_ADDITIONAL_MESSAGES_SUCCESS,
  GET_ADDITIONAL_MESSAGES_FAIL,
  ADD_USER_GROUP_REQUEST,
  ADD_USER_GROUP_SUCCESS,
  ADD_USER_GROUP_FAIL,
  ADD_USER_GROUP_RESET,
  ADD_NEW_GROUP_MEMBER,
  REMOVE_CHAT_FROM_LIST,
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
    case ADD_USER_GROUP_REQUEST:
      return { ...state, loading: true };
    case ADD_USER_GROUP_SUCCESS:
      return { ...state, loading: false, addUserSuccess: true };
    case ADD_USER_GROUP_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_USER_GROUP_RESET:
      return { ...state, addUserSuccess: false };
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
    case UPDATE_LAST_MESSAGE:
      const updatedLastMessage = action.payload;
      const { fromUser, message, createdAt, chatId, messageType, post } =
        updatedLastMessage;
      let updatedChat = state.chatList.find(chat => chat._id === chatId);
      updatedChat = {
        ...updatedChat,
        lastMessage: { fromUser, message, createdAt, messageType, post },
      };

      let updatedChatList = state.chatList.filter(chat => chat._id !== chatId);
      updatedChatList = [updatedChat, ...updatedChatList];

      return { ...state, chatList: updatedChatList };
    case ADD_CHAT:
      return { ...state, chatList: [action.payload, ...state.chatList] };
    case REMOVE_CHAT_FROM_LIST:
      const updatedList = state.chatList.filter(
        chat => chat._id !== action.payload
      );
      return { ...state, chatList: updatedList };
    default:
      return state;
  }
};

const chatFeedInitialState = {
  loading: true,
  fetchingAdditional: false,
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
  hasMoreMessages: true,
};
export const chatFeedReducer = (state = chatFeedInitialState, action) => {
  switch (action.type) {
    case GET_CHAT_FEED_REQUEST:
      return { ...state, loading: true, error: false };
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
        hasMoreMessages: messages.length === 20,
      };
    case RECEIVED_MESSAGE:
      const { fromUser, message, chatId, messageType, post } = action.payload;
      // if chatId doesnt equal current chatId shown to user don't add new message
      if (chatId === state.currentChatId) {
        return {
          ...state,
          messages: [
            ...state.messages,
            {
              _id: new Date().toString(),
              fromUser,
              message,
              messageType,
              post,
            },
          ],
        };
      }
      return state;
    case PARTNER_TYPING:
      // filter any typing status from partnersArr fot current chat and then add if typing true
      // currentPartnerTyping = {chatId, fromUser, typing}
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
    case ADD_NEW_GROUP_MEMBER:
      return { ...state, partners: [...state.partners, ...action.payload] };
    case GET_ADDITIONAL_MESSAGES_REQUEST:
      return { ...state, fetchingAdditional: true };
    case GET_ADDITIONAL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: [...action.payload, ...state.messages],
        hasMoreMessages: action.payload.length === 20,
      };
    case GET_ADDITIONAL_MESSAGES_FAIL:
      return state;
    default:
      return state;
  }
};
