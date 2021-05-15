import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
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
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postLike: postLikeReducer,
  postComment: postCommentReducer,
  singlePostGet: singlePostGetReducer,
});

export default rootReducer;
