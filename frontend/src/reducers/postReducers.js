import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_GET_USER_DETAILS_REQUEST,
  POST_GET_USER_DETAILS_SUCCESS,
  POST_GET_USER_DETAILS_FAIL,
} from '../constants/postConstants';

export const postsGetReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POSTS_GET_REQUEST:
      return { loading: true };
    case POSTS_GET_SUCCESS:
      return { loading: false, posts: action.payload };
    case POSTS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postGetUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case POST_GET_USER_DETAILS_REQUEST:
      return { loading: true };
    case POST_GET_USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case POST_GET_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
