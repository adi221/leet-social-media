import axios from 'axios';
import { sendConfig } from '../helpers/configHeaders';

/**
 * Login to app
 * @function loginApi
 * @param {object} userDetails user's password and email
 * @returns {object} userInfo - token, username, profileImage..
 */
export const loginApi = async userDetails => {
  try {
    const { data } = await axios.post(
      '/api/users/login',
      { ...userDetails },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Register a new user
 * @function registerApi
 * @param {object} userDetails user's password, name, username and email
 * @returns {object} userInfo - token, username, profileImage..
 */
export const registerApi = async userDetails => {
  try {
    const { data } = await axios.post(
      '/api/users',
      { ...userDetails },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves profile details of a user
 * @function getUserProfileDetailsApi
 * @param {string} username
 * @returns {object} User profile details
 */
export const getUserProfileDetailsApi = async username => {
  try {
    const { data } = await axios.get(`/api/users/${username}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves likes and saved posts for user
 * @function getUserProfileRelatedPostsApi
 * @param {string} username
 * @returns {object} User profile saved and liked posts
 */
export const getUserProfileRelatedPostsApi = async username => {
  try {
    const { data } = await axios.get(`/api/users/relatedposts/${username}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves user details for settings
 * @function getUserDetailsApi
 * @param {string} token Authorization token
 * @returns {object} User profile saved and liked posts
 */
export const getUserDetailsApi = async token => {
  try {
    const { data } = await axios.get(`/api/users/settings`, sendConfig(token));
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates user's details
 * @function followUserApi
 * @param {string} userId the user to follow
 * @param {string} token Authorization token
 * @returns {array} new following stats
 */
export const followUserApi = async (userId, token) => {
  try {
    const { data } = await axios.put(
      `/api/users/follow/${userId}`,
      {},
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates user's details
 * @function unfollowUserApi
 * @param {string} userId the user to unfollow
 * @param {string} token Authorization token
 * @returns {array} new following stats
 */
export const unfollowUserApi = async (userId, token) => {
  try {
    const { data } = await axios.put(
      `/api/users/unfollow/${userId}`,
      {},
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates user's details
 * @function updateUserProfileApi
 * @param {object} userDetails user details to update
 * @param {string} token Authorization token
 * @returns {object} User new info
 */
export const updateUserProfileApi = async (userDetails, token) => {
  try {
    const { data } = await axios.put(
      `/api/users/profile`,
      { ...userDetails },
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates user's password
 * @function updateUserPasswordApi
 * @param {object} userDetails user details to update
 * @param {string} token Authorization token
 * @returns {object} User new info
 */
export const updateUserPasswordApi = async (
  oldPassword,
  newPassword,
  token
) => {
  try {
    const { data } = await axios.put(
      `/api/users/profile/password`,
      { oldPassword, newPassword },
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves user details for settings
 * @function getUserSuggestionsApi
 * @param {string} id id of user
 * @returns {array} Array of suggestions
 */
export const getUserSuggestionsApi = async id => {
  try {
    const { data } = await axios.get(`/api/users/suggest/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves user stats - following and bookmark ids
 * @function getUserStatsApi
 * @param {string} id id of user
 * @returns {object} Object contains two arrays
 */
export const getUserStatsApi = async id => {
  try {
    const { data } = await axios.get(`/api/users/stats/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves user stats - following and bookmark ids
 * @function getUserSearchApi
 * @param {string} keyword keyword to search
 * @returns {object} Object contains two arrays
 */
export const getUserSearchApi = async keyword => {
  try {
    const { data } = await axios.get(`/api/users?keyword=${keyword}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Delete user
 * @function deleteUserApi
 * @param {string} userId to delete
 */
export const deleteUserApi = async userId => {
  try {
    await axios.delete(`/api/users/${userId}`);
  } catch (error) {
    throw new Error(error);
  }
};
