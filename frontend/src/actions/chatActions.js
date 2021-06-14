import axios from 'axios';
import {
  CHANGE_CHAT_PARTNERS,
  RESET_CHAT_PARTNERS,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAIL,
  ADD_CHAT,
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
  ADD_NEW_GROUP_MEMBER,
  REMOVE_CHAT_FROM_LIST,
} from '../constants/chatConstants';

export const changePartnerUsersId = (id, type) => (dispatch, getState) => {
  const {
    createChat: { partnerUsersId },
  } = getState();

  let newPartnerUsersId = [];

  if (type === 'del') {
    newPartnerUsersId = partnerUsersId.filter(userId => userId !== id);
  } else {
    newPartnerUsersId = [...partnerUsersId, id];
  }

  dispatch({ type: CHANGE_CHAT_PARTNERS, payload: newPartnerUsersId });
};

export const createChat = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CHAT_REQUEST });

    const {
      createChat: { partnerUsersId },
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/chats', { partnerUsersId }, config);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
    dispatch({ type: RESET_CHAT_PARTNERS });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUsersToGroup = chatId => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_USER_GROUP_REQUEST });

    const {
      createChat: { partnerUsersId },
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/chats/${chatId}`, { partnerUsersId }, config);
    dispatch({ type: ADD_USER_GROUP_SUCCESS });
    dispatch({ type: RESET_CHAT_PARTNERS });
  } catch (error) {
    dispatch({
      type: ADD_USER_GROUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChatLists = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CHAT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/chats/list', config);
    dispatch({ type: GET_CHAT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CHAT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChatFeed = chatId => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CHAT_FEED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chats/${chatId}`, config);
    dispatch({ type: GET_CHAT_FEED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CHAT_FEED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAdditionalMessages = (chatId, offset) => async dispatch => {
  try {
    dispatch({ type: GET_ADDITIONAL_MESSAGES_REQUEST });
    const { data } = await axios.get(`/api/chats/${chatId}/${offset}`);
    dispatch({ type: GET_ADDITIONAL_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ADDITIONAL_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addChat = chat => dispatch => {
  dispatch({ type: ADD_CHAT, payload: chat });
};

export const updateLastMessage = message => ({
  type: UPDATE_LAST_MESSAGE,
  payload: message,
});

export const receivedMessage = message => dispatch => {
  dispatch({ type: RECEIVED_MESSAGE, payload: message });
};

export const partnerTyping = chatPartnerTyping => dispatch => {
  dispatch({ type: PARTNER_TYPING, payload: chatPartnerTyping });
};

export const addNewGroupMembers = newMembers => ({
  type: ADD_NEW_GROUP_MEMBER,
  payload: newMembers,
});

export const removeChatFromList = chatId => ({
  type: REMOVE_CHAT_FROM_LIST,
  payload: chatId,
});
