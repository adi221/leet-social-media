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
} from '../constants/notificationConstants';

const notificationsInitialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: false,
  showPopup: false,
};

export const notificationsReducer = (
  state = notificationsInitialState,
  action
) => {
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

const chatNotificationsInitialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: false,
};

export const chatNotificationsReducer = (
  state = chatNotificationsInitialState,
  action
) => {
  switch (action.type) {
    case GET_CHAT_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_CHAT_NOTIFICATIONS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        notifications: action.payload,
        unreadCount: action.payload.length,
      };
    case GET_CHAT_NOTIFICATIONS_FAIL:
      return { ...state, loading: false, error: false };
    case ADD_CHAT_NOTIFICATION:
      const chatId = action.payload;
      if (state.notifications.includes(chatId)) {
        return state;
      }
      return {
        ...state,
        notifications: [...state.notifications, chatId],
        unreadCount: state.unreadCount + 1,
      };
    case READ_CHAT_NOTIFICATION:
      const chatIdToRemove = action.payload;
      const filteredNotifications = state.notifications.filter(
        notificationId => notificationId !== chatIdToRemove
      );

      return {
        ...state,
        notifications: filteredNotifications,
        unreadCount: filteredNotifications.length,
      };
    default:
      return state;
  }
};
