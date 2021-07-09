import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsProfileReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  userSuggestionsReducer,
  userDeleteReducer,
  userStatsReducer,
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  postDeleteReducer,
  postsExploreReducer,
  sharePostReducer,
} from '../reducers/postReducers';
import { modalReducer, alertReducer } from '../reducers/utilReducers';
import { socketReducer } from '../reducers/socketReducers';
import {
  notificationsReducer,
  chatNotificationsReducer,
} from '../reducers/notificationReducers';
import {
  chatListReducer,
  createChatReducer,
  chatFeedReducer,
} from '../reducers/chatReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetailsProfile: userDetailsProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userDetails: userDetailsReducer,
  userSuggestions: userSuggestionsReducer,
  userDelete: userDeleteReducer,
  userStats: userStatsReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postDelete: postDeleteReducer,
  postsExplore: postsExploreReducer,
  sharePost: sharePostReducer,
  modal: modalReducer,
  alert: alertReducer,
  socket: socketReducer,
  notifications: notificationsReducer,
  chatNotifications: chatNotificationsReducer,
  chatList: chatListReducer,
  createChat: createChatReducer,
  chatFeed: chatFeedReducer,
});

export default rootReducer;
