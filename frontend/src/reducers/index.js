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
  userBookmarksReducer,
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  postDeleteReducer,
} from '../reducers/postReducers';
import { modalReducer } from '../reducers/utilReducers';

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
  userBookmarks: userBookmarksReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postDelete: postDeleteReducer,
  modal: modalReducer,
});

export default rootReducer;
