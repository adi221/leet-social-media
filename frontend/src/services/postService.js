import axios from 'axios';
import { sendConfig } from '../helpers/configHeaders';

/**
 * Retrieves post ids for feed
 * @function getPostsApi
 * @param {string} token Authorization token
 * @returns {array} Array of post ids to render in intervals
 */
export const getPostsApi = async token => {
  try {
    const { data } = await axios.get(`/api/posts`, sendConfig(token));
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves post ids for feed
 * @function getSinglePostApi
 * @param {string} postId Authorization token
 * @returns {object} Post and post author info
 */
export const getSinglePostApi = async postId => {
  try {
    const { data } = await axios.get(`/api/posts/${postId}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Creates a new post
 * @function createPostApi
 * @param {object} postBody Description and picture of post
 * @param {string} token authorization token
 */
export const createPostApi = async (postBody, token) => {
  try {
    await axios.post(`/api/posts`, { ...postBody }, sendConfig(token));
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Like a post
 * @function likePostApi
 * @param {string} postId id of a post
 * @param {string} token authorization token
 * @returns {array} updated array of likes for post TODO:
 */
export const likePostApi = async (postId, token) => {
  try {
    const { data } = await axios.post(
      `/api/posts/like/${postId}`,
      {},
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a post
 * @function createPostApi
 * @param {object} postBody Description and picture of post
 * @param {string} token authorization token
 */
export const deletePostApi = async (postId, token) => {
  try {
    await axios.delete(`/api/posts/delete/${postId}`, sendConfig(token));
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves explore posts - image and number of likes and comments
 * @function getExplorePostsApi
 * @param {number} offset Number of posts to skip
 * @returns {array} Array of explore preview posts
 */
export const getExplorePostsApi = async offset => {
  try {
    const { data } = await axios.get(`/api/posts/explore/${offset}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves list of users that liked a certain post
 * @function getPostLikesApi
 * @param {string} postId id of post
 * @param {number} offset number of users to skip
 * @returns {array} Array of users
 */
export const getPostLikesApi = async (postId, offset) => {
  try {
    const { data } = await axios.get(`/api/posts/${postId}/${offset}/likes`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
