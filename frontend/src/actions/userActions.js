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
  USER_BOOKMARKS_REQUEST,
  USER_BOOKMARKS_SUCCESS,
  USER_BOOKMARKS_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { username, name, email, password },
      config
    );
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

export const getUserProfileDetails = id => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_PROFILE_GET_REQUEST });
    const { data } = await axios.get(`/api/users/${id}`);
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

export const followUser = userId => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FOLLOW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/users/follow/${userId}`, {}, config);
    dispatch({ type: USER_FOLLOW_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_FOLLOW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unfollowUser = userId => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UNFOLLOW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/users/unfollow/${userId}`, {}, config);
    dispatch({ type: USER_UNFOLLOW_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_UNFOLLOW_FAIL,
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/settings`, {}, config);
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile`,
      { ...userDetails },
      config
    );
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

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/profile/password`,
        { oldPassword, newPassword },
        config
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
    const { data } = await axios.get(`/api/users/suggest/${id}`);
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

export const getUserBookmarks = id => async dispatch => {
  try {
    dispatch({ type: USER_BOOKMARKS_REQUEST });
    const { data } = await axios.get(`/api/users/bookmark/${id}`);
    dispatch({ type: USER_BOOKMARKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_BOOKMARKS_FAIL,
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
