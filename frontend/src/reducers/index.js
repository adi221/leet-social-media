import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
} from '../reducers/userReducers';
import {
  postCreateReducer,
  postsGetReducer,
  postGetUserDetailsReducer,
} from '../reducers/postReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  postCreate: postCreateReducer,
  postsGet: postsGetReducer,
  postGetUserDetails: postGetUserDetailsReducer,
});

export default rootReducer;
