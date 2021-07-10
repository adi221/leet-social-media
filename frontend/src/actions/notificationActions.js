import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_RESET,
  READ_NOTIFICATIONS,
  HIDE_NOTIFICATION_POPUP,
  GET_CHAT_NOTIFICATIONS_REQUEST,
  GET_CHAT_NOTIFICATIONS_SUCCESS,
  GET_CHAT_NOTIFICATIONS_FAIL,
  ADD_CHAT_NOTIFICATION,
  READ_CHAT_NOTIFICATION,
  GET_ADDITIONAL_NOTIFICATIONS_REQUEST,
  GET_ADDITIONAL_NOTIFICATIONS_SUCCESS,
  GET_ADDITIONAL_NOTIFICATIONS_FAIL,
} from '../constants/notificationConstants';
import {
  getNotificationsApi,
  readNotificationsApi,
  getChatNotificationsApi,
} from '../services/notificationService';

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const hidePopup = () => ({ type: HIDE_NOTIFICATION_POPUP });

export const resetNotifications = () => ({ type: GET_NOTIFICATIONS_RESET });

export const getNotifications =
  (offset = 0) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_NOTIFICATIONS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const data = await getNotificationsApi(userInfo.token, offset);
      dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATIONS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const readNotifications = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    await readNotificationsApi(userInfo.token);
    dispatch({ type: READ_NOTIFICATIONS });
  } catch (error) {
    console.error(error);
  }
};

export const getAdditionalNotifications =
  offset => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ADDITIONAL_NOTIFICATIONS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const data = await getNotificationsApi(userInfo.token, offset);
      dispatch({ type: GET_ADDITIONAL_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ADDITIONAL_NOTIFICATIONS_FAIL });
    }
  };

export const getChatNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CHAT_NOTIFICATIONS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const data = await getChatNotificationsApi(userInfo.token);
    dispatch({ type: GET_CHAT_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CHAT_NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addChatNotification =
  (chatId, fromUser) => (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    if (userInfo._id === fromUser) return;

    dispatch({ type: ADD_CHAT_NOTIFICATION, payload: chatId });
  };

export const readChatNotification = chatId => ({
  type: READ_CHAT_NOTIFICATION,
  payload: chatId,
});
