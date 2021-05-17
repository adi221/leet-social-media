import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsProfileReducer,
  userFollowReducer,
  userUnfollowReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  singlePostGetReducer,
} from '../reducers/postReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetailsProfile: userDetailsProfileReducer,
  userFollow: userFollowReducer,
  userUnfollow: userUnfollowReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,

  singlePostGet: singlePostGetReducer,
});

export default rootReducer;
