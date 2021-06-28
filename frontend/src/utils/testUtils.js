import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { middleware } from '../store';

/**
 * Function to find a component by it's data-test attribute
 * @function findByTestAttribute
 * @param {ShallowWarapper} component that will be shallow wrapped
 * @param {string} attr Attribute to find
 * @returns {JSX.Element}
 */
export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

/**
 * Function to check props on a react component
 * @function checkProps
 * @param {React.Component} Component Component to assert on.
 * @param {object} expectedProps Expected props.
 * @returns {undefined | Error}
 */
/* eslint react/forbid-foreign-prop-types: 0 */
export const checkProps = (Component, expectedProps) => {
  const result = checkPropTypes(
    Component.propTypes,
    expectedProps,
    'prop',
    Component.name
  );

  return result;
};

/**
 * Create a testing store with imported reducers, middleware,and initial state
 *  globals: rootReducer, middlewares.
 * @function storeFactory
 * @param {object} initialState Initial state for the store.
 * @returns {store} Redux store
 */
export const storeFactory = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};

/**
 * @object Mock state for tests
 */
export const mockState = {
  userLogin: {
    userInfo: { _id: '1', username: '11', profileImage: '', token: '11' },
  },
  userSuggestions: { loading: false, error: false, suggestions: [] },
  userRegister: {},
  userDetailsProfile: {
    loading: false,
    error: false,
    user: { _id: '1', username: 'adi' },
  },
  userDetails: {},
  userSearch: { users: [] },
  userStats: { bookmarks: [], following: [] },
  postsGet: { loading: false, posts: [{ _id: '1' }], loadedPosts: [] },
  postCreate: { loading: false },
  postsExplore: { postPreviews: [] },
  sharePost: { postReceiversId: [] },
  modal: { isShow: false },
  alert: { isShow: false },
  socket: { socket: {} },
  notifications: { notifications: [] },
  chatNotifications: { notifications: [] },
  chatList: { chatList: [] },
  createChat: { partnerUsersId: [], redirectChatId: null },
  chatFeed: { partners: [], chatType: '', messages: [] },
};
