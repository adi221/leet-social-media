import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsProfileReducer,
  userFollowReducer,
  userUnfollowReducer,
  userDetailsReducer,
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  postLikeReducer,
  postCommentReducer,
  singlePostGetReducer,
} from '../reducers/postReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetailsProfile: userDetailsProfileReducer,
  userFollow: userFollowReducer,
  userUnfollow: userUnfollowReducer,
  userDetails: userDetailsReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postLike: postLikeReducer,
  postComment: postCommentReducer,
  singlePostGet: singlePostGetReducer,
});

export default rootReducer;
