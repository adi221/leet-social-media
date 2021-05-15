import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsProfileReducer,
  userDetailsPostsReducer,
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
  userDetailsPosts: userDetailsPostsReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postLike: postLikeReducer,
  postComment: postCommentReducer,
  singlePostGet: singlePostGetReducer,
});

export default rootReducer;
