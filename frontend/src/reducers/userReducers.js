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
  USER_DETAILS_PROFILE_RELATED_REQUEST,
  USER_DETAILS_PROFILE_RELATED_SUCCESS,
  USER_DETAILS_PROFILE_RELATED_FAIL,
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
  USER_SUGGESTIONS_REQUEST,
  USER_SUGGESTIONS_SUCCESS,
  USER_SUGGESTIONS_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_STATS_REQUEST,
  USER_STATS_SUCCESS,
  USER_STATS_FAIL,
  USER_STATS_BOOKMARKS,
  USER_STATS_FOLLOWING,
} from '../constants/userConstants';

export const userLoginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
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

const userProfileInitialState = {
  loading: true,
  error: false,
  user: {
    _id: '',
    profileImage: '',
    username: '',
    name: '',
    description: '',
    following: [],
    followers: [],
    userPosts: [],
    userSavedPosts: [],
    userLikedPosts: [],
  },
};

export const userDetailsProfileReducer = (
  state = userProfileInitialState,
  action
) => {
  switch (action.type) {
    case USER_DETAILS_PROFILE_GET_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_PROFILE_GET_SUCCESS:
      return { loading: false, user: { ...state.user, ...action.payload } };
    case USER_DETAILS_PROFILE_GET_FAIL:
      return { loading: false, error: action.payload, user: {} };
    case USER_DETAILS_PROFILE_RELATED_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_PROFILE_RELATED_SUCCESS:
      const { userLikedPosts, userSavedPosts } = action.payload;
      return {
        ...state,
        loading: false,
        user: { ...state.user, userLikedPosts, userSavedPosts },
      };
    case USER_DETAILS_PROFILE_RELATED_FAIL:
      return { ...state };
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

export const userSuggestionsReducer = (state = { suggestions: [] }, action) => {
  switch (action.type) {
    case USER_SUGGESTIONS_REQUEST:
      return { loading: true, suggestions: [] };
    case USER_SUGGESTIONS_SUCCESS:
      return { loading: false, suggestions: action.payload };
    case USER_SUGGESTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_SEARCH_REQUEST:
      return { loading: false, users: [] };
    case USER_SEARCH_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: false };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userStatsReducer = (
  state = { bookmarks: [], following: [] },
  action
) => {
  switch (action.type) {
    case USER_STATS_REQUEST:
      return { ...state, loading: false };
    case USER_STATS_SUCCESS:
      return {
        loading: false,
        bookmarks: action.payload.savedPosts,
        following: action.payload.following,
      };
    case USER_STATS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_STATS_BOOKMARKS:
      return { ...state, bookmarks: action.payload };
    case USER_STATS_FOLLOWING:
      return { ...state, following: action.payload };
    default:
      return state;
  }
};
