import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsProfileReducer,
  userFollowReducer,
  userUnfollowReducer,
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
import { notificationsReducer } from '../reducers/notificationReducers';
import {
  chatListReducer,
  createChatReducer,
  chatFeedReducer,
} from '../reducers/chatReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetailsProfile: userDetailsProfileReducer,
  userFollow: userFollowReducer,
  userUnfollow: userUnfollowReducer,
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
  chatList: chatListReducer,
  createChat: createChatReducer,
  chatFeed: chatFeedReducer,
});

export default rootReducer;
