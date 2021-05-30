import axios from 'axios';
import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_RESET,
  READ_NOTIFICATIONS,
} from '../constants/notificationConstants';

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const resetNotifications = () => ({ type: GET_NOTIFICATIONS_RESET });

export const getNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/notifications/${userInfo._id}`);
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/notifications`, {}, config);
    dispatch({ type: READ_NOTIFICATIONS });
  } catch (error) {
    console.error(error);
  }
};
