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
