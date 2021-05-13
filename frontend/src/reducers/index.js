import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
} from '../reducers/userReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;
