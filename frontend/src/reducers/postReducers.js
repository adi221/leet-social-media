import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POSTS_ADD_LOADED,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_RESET,
} from '../constants/postConstants';

export const postsGetReducer = (
  state = { posts: [], loadedPosts: [] },
  action
) => {
  switch (action.type) {
    case POSTS_GET_REQUEST:
      return { loading: true };
    case POSTS_GET_SUCCESS:
      return {
        loading: false,
        posts: action.payload.slice(3),
        loadedPosts: action.payload.slice(0, 3),
      };
    case POSTS_GET_FAIL:
      return { loading: false, error: action.payload };
    case POSTS_ADD_LOADED:
      let newLoadedPosts = [];
      const len = state.posts.length;
      for (let i = 0; i < Math.min(len, 3); i++) {
        newLoadedPosts.push(state.posts.shift());
      }
      return {
        ...state,
        loadedPosts: [...state.loadedPosts, ...newLoadedPosts],
      };
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

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
