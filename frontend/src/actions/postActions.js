import {
  POSTS_GET_REQUEST,
  POSTS_GET_SUCCESS,
  POSTS_GET_FAIL,
  CLEAR_POSTS,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POSTS_EXPLORE_REQUEST,
  POSTS_EXPLORE_SUCCESS,
  POSTS_EXPLORE_FAIL,
  CHANGE_POST_RECEIVERS,
  SHARE_POST_SUCCESS,
  ADD_NEW_POST,
} from '../constants/postConstants';
import {
  getPostsApi,
  createPostApi,
  deletePostApi,
  getExplorePostsApi,
} from '../services/postService';

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POSTS_GET_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const data = await getPostsApi(userInfo.token);
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

export const clearPosts = () => ({ type: CLEAR_POSTS });

export const createPost = (file, description) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    await createPostApi({ file, description }, userInfo.token);
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

    await deletePostApi(postId, userInfo.token);
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
    const data = await getExplorePostsApi(offset);
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

export const changeSharePostReceivers = (id, type) => (dispatch, getState) => {
  const {
    sharePost: { postReceiversId },
  } = getState();

  let newPostReceiversId = [];

  if (type === 'del') {
    newPostReceiversId = postReceiversId.filter(userId => userId !== id);
  } else {
    newPostReceiversId = [...postReceiversId, id];
  }

  dispatch({ type: CHANGE_POST_RECEIVERS, payload: newPostReceiversId });
};

export const sharePostSuccess = () => ({ type: SHARE_POST_SUCCESS });

export const addNewPost = newPostId => ({
  type: ADD_NEW_POST,
  payload: newPostId,
});
