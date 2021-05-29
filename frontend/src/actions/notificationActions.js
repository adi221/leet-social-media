import axios from 'axios';
import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
} from '../constants/notificationConstants';

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

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
