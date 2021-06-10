import axios from 'axios';
import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POSTS_EXPLORE_REQUEST,
  POSTS_EXPLORE_SUCCESS,
  POSTS_EXPLORE_FAIL,
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

export const deletePost = (postId, userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/posts/delete/${postId}/${userId}`, {}, config);
    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExplorePostPreviews = offset => async dispatch => {
  try {
    dispatch({ type: POSTS_EXPLORE_REQUEST });
    const { data } = await axios.get(`/api/posts/explore/${offset}`);
    dispatch({ type: POSTS_EXPLORE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POSTS_EXPLORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
