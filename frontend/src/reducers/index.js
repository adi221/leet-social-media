import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsProfileReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  userSuggestionsReducer,
  userSearchReducer,
  userDeleteReducer,
  userStatsReducer,
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  postDeleteReducer,
} from '../reducers/postReducers';
import { modalReducer } from '../reducers/utilReducers';
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
  userSearch: userSearchReducer,
  userDelete: userDeleteReducer,
  userStats: userStatsReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postDelete: postDeleteReducer,
  modal: modalReducer,
  socket: socketReducer,
  notifications: notificationsReducer,
  chatNotifications: chatNotificationsReducer,
  chatList: chatListReducer,
  createChat: createChatReducer,
  chatFeed: chatFeedReducer,
});

export default rootReducer;
