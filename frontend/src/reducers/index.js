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
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  singlePostGetReducer,
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
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postDelete: postDeleteReducer,
  singlePostGet: singlePostGetReducer,
  modal: modalReducer,
});

export default rootReducer;
