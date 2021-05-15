import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_PROFILE_GET_REQUEST,
  USER_DETAILS_PROFILE_GET_SUCCESS,
  USER_DETAILS_PROFILE_GET_FAIL,
  USER_DETAILS_POSTS_GET_REQUEST,
  USER_DETAILS_POSTS_GET_SUCCESS,
  USER_DETAILS_POSTS_GET_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_PROFILE_GET_REQUEST:
      return { loading: true, user: {} };
    case USER_DETAILS_PROFILE_GET_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_PROFILE_GET_FAIL:
      return { loading: false, error: action.payload, user: {} };
    default:
      return state;
  }
};

export const userDetailsPostsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_POSTS_GET_REQUEST:
      return { loading: true };
    case USER_DETAILS_POSTS_GET_SUCCESS:
      const { likedPosts, savedPosts, posts } = action.payload;
      return { loading: false, posts, savedPosts, likedPosts };
    case USER_DETAILS_POSTS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
