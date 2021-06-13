import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem('userInfoLeet')
  ? JSON.parse(localStorage.getItem('userInfoLeet'))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

console.log(store.getState());

export default store;
