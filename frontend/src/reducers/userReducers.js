import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_ADD_SAVED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_PROFILE_GET_REQUEST,
  USER_DETAILS_PROFILE_GET_SUCCESS,
  USER_DETAILS_PROFILE_GET_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_DETAILS_GET_REQUEST,
  USER_DETAILS_GET_SUCCESS,
  USER_DETAILS_GET_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_RESET,
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
    case USER_LOGIN_ADD_SAVED:
      return {
        loading: false,
        userInfo: { ...state.userInfo, savedPosts: action.payload },
      };
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

export const userFollowReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FOLLOW_REQUEST:
      return { loading: true };
    case USER_FOLLOW_SUCCESS:
      return { loading: false, success: true };
    case USER_FOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUnfollowReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UNFOLLOW_REQUEST:
      return { loading: true };
    case USER_UNFOLLOW_SUCCESS:
      return { loading: false, success: true };
    case USER_UNFOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_GET_REQUEST:
      return { loading: true, user: {} };
    case USER_DETAILS_GET_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
