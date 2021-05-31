import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_RESET,
  READ_NOTIFICATIONS,
  HIDE_NOTIFICATION_POPUP,
} from '../constants/notificationConstants';

const INITIAL_STATE = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: false,
  showPopup: false,
};

export const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
        showPopup: true,
      };
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      const numUnreadNotifications = action.payload.filter(
        notification => notification.read === false
      ).length;

      return {
        ...state,
        loading: false,
        notifications: action.payload,
        unreadCount: numUnreadNotifications,
      };
    case GET_NOTIFICATIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_NOTIFICATIONS_RESET: {
      return { ...state, notifications: [], unreadCount: 0 };
    }
    case READ_NOTIFICATIONS:
      return { ...state, unreadCount: 0 };
    case HIDE_NOTIFICATION_POPUP:
      return { ...state, showPopup: false };
    default:
      return state;
  }
};
