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
 * Deletes a post
 * @function createPostApi
 * @param {object} postBody Description and picture of post
 * @param {string} token authorization token
 */
export const deletePostApi = async (postId, token) => {
  try {
    await axios.post(`/api/posts/delete/${postId}`, {}, sendConfig(token));
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
