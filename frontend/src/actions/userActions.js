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
  USER_DETAILS_POSTS_GET_REQUEST,
  USER_DETAILS_POSTS_GET_SUCCESS,
  USER_DETAILS_POSTS_GET_FAIL,
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

export const register = (username, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      { username, email, password },
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

export const getUserProfileDetails = username => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_PROFILE_GET_REQUEST });
    const { data } = await axios.get(`/api/users/${username}`);
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

export const getUserPostsDetails = username => async dispatch => {
  try {
    dispatch({ type: USER_DETAILS_PROFILE_GET_REQUEST });
    const { data } = await axios.get(`/api/users/posts/${username}`);
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
