import axios from 'axios';
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
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
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
} from '../constants/userConstants';
import {
  loginApi,
  registerApi,
  getUserProfileDetailsApi,
  getUserProfileRelatedPostsApi,
  getUserDetailsApi,
  updateUserProfileApi,
  updateUserPasswordApi,
  getUserSuggestionsApi,
} from '../services/userService';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const data = await loginApi({ email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfoLeet', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('userInfoLeet');
};

export const register = (username, name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const data = await registerApi({ username, name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfoLeet', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfileDetails = username => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_PROFILE_GET_REQUEST });
    const data = await getUserProfileDetailsApi(username);
    dispatch({ type: USER_DETAILS_PROFILE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_PROFILE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfileRelatedPosts = username => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_PROFILE_RELATED_REQUEST });
    const data = await getUserProfileRelatedPostsApi(username);
    dispatch({ type: USER_DETAILS_PROFILE_RELATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_PROFILE_RELATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_GET_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await getUserDetailsApi(userInfo.token);
    dispatch({ type: USER_DETAILS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = userDetails => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await updateUserProfileApi({ ...userDetails }, userInfo.token);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfoLeet', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserPassword =
  ({ oldPassword, newPassword }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const data = await updateUserPasswordApi(
        oldPassword,
        newPassword,
        userInfo.token
      );
      dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfoLeet', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserSuggestions = id => async dispatch => {
  try {
    dispatch({ type: USER_SUGGESTIONS_REQUEST });

    const data = await getUserSuggestionsApi(id);
    dispatch({ type: USER_SUGGESTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SUGGESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserStats = id => async dispatch => {
  try {
    dispatch({ type: USER_STATS_REQUEST });
    const { data } = await axios.get(`/api/users/stats/${id}`);
    dispatch({ type: USER_STATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserSearch = keyword => async dispatch => {
  try {
    dispatch({ type: USER_SEARCH_REQUEST });
    const { data } = await axios.get(`/api/users?keyword=${keyword}`);
    dispatch({ type: USER_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = userId => async dispatch => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    await axios.delete(`/api/users/${userId}`);
    dispatch({ type: USER_DELETE_SUCCESS });
    localStorage.removeItem('userInfoLeet');
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
