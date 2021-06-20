import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POSTS_ADD_LOADED,
  ADD_NEW_POST,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_RESET,
  POSTS_EXPLORE_REQUEST,
  POSTS_EXPLORE_SUCCESS,
  POSTS_EXPLORE_FAIL,
  CHANGE_POST_RECEIVERS,
  RESET_POST_RECEIVERS,
  SHARE_POST_SUCCESS,
  SHARE_POST_RESET,
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
    case ADD_NEW_POST:
      return {
        ...state,
        loadedPosts: [{ _id: action.payload }, ...state.loadedPosts],
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

export const postsExploreReducer = (state = { postPreviews: [] }, action) => {
  switch (action.type) {
    case POSTS_EXPLORE_REQUEST:
      return { ...state, loading: true };
    case POSTS_EXPLORE_SUCCESS:
      return { ...state, loading: false, postPreviews: action.payload };
    case POSTS_EXPLORE_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const sharePostReducer = (state = { postReceiversId: [] }, action) => {
  switch (action.type) {
    case CHANGE_POST_RECEIVERS:
      return { ...state, postReceiversId: action.payload };
    case RESET_POST_RECEIVERS:
      return { ...state, postReceiversId: [] };
    case SHARE_POST_SUCCESS:
      return { ...state, postReceiversId: [], success: true };
    case SHARE_POST_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};
