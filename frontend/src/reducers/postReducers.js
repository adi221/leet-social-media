import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_RESET,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_RESET,
  SINGLE_POST_GET_REQUEST,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_GET_FAIL,
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

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, success: true };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    case POST_LIKE_RESET:
      return {};
    default:
      return state;
  }
};

export const postCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return { loading: true };
    case POST_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case POST_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case POST_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const singlePostGetReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case SINGLE_POST_GET_REQUEST:
      return { loading: true };
    case SINGLE_POST_GET_SUCCESS:
      return { loading: false, post: action.payload };
    case SINGLE_POST_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
