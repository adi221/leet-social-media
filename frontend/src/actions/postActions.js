import axios from 'axios';
import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  SINGLE_POST_GET_REQUEST,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_GET_FAIL,
} from '../constants/postConstants';

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: POSTS_GET_REQUEST });
    const { data } = await axios.get('/api/posts');
    dispatch({ type: POSTS_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POSTS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost =
  (file, tags, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post('/api/posts', { file, tags, description }, config);
      dispatch({ type: POST_CREATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const likePost = id => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/posts/like/${id}`, {}, config);
    dispatch({ type: POST_LIKE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const commentPost = (id, comment) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_COMMENT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/posts/comment/${id}`, { comment }, config);
    dispatch({ type: POST_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSinglePostDetails = id => async dispatch => {
  try {
    dispatch({ type: SINGLE_POST_GET_REQUEST });
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({ type: SINGLE_POST_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_POST_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};