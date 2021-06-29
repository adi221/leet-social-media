import axios from 'axios';
import { sendConfig } from '../helpers/configHeaders';

/**
 * Creates a new chat
 * @function createChatApi
 * @param {array} partnerUsersId Array of id's of partners for chat
 * @param {string} token authorization token
 * @returns {string} Chat id to redirect to
 */
export const createChatApi = async (partnerUsersId, token) => {
  try {
    const { data } = await axios.post(
      `/api/chats`,
      { partnerUsersId },
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Creates a new chat
 * @function addUsersToGroupApi
 * @param {string} chatId Chat id
 * @param {array} partnerUsersId Array of id's of partners to add
 * @param {string} token authorization token
 */
export const addUsersToGroupApi = async (chatId, partnerUsersId, token) => {
  try {
    const { data } = await axios.put(
      `/api/chats/${chatId}`,
      { partnerUsersId },
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves the list of chats for user
 * @function getChatListsApi
 * @param {string} token authorization token
 * @returns {array} Array of chat lists
 */
export const getChatListsApi = async token => {
  try {
    const { data } = await axios.get(`/api/chats/list`, sendConfig(token));
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves the list of chats for user
 * @function getChatFeedApi
 * @param {string} chatId id of chat
 * @param {string} token authorization token
 * @returns {object} Object of chat details like users, messages
 */
export const getChatFeedApi = async (chatId, token) => {
  try {
    const { data } = await axios.get(`/api/chats/${chatId}`, sendConfig(token));
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves additional messages for a chat
 * @function getAdditionalMessagesApi
 * @param {string} chatId id of chat
 * @param {number} offset number of messages to skip
 * @returns {object} Object of chat details like users, messages
 */
export const getAdditionalMessagesApi = async (chatId, offset) => {
  try {
    const { data } = await axios.get(`/api/chats/${chatId}/${offset}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * User leaves group
 * @function leaveGroupApi
 * @param {string} chatId id of chat
 * @param {string} token authorization token
 */
export const leaveGroupApi = async (chatId, token) => {
  try {
    await axios.put(`/api/chats/leave/${chatId}`, {}, sendConfig(token));
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * User deletes group from chat so hide it
 * @function hideChatForUserApi
 * @param {string} chatId id of chat
 * @param {string} token authorization token
 */
export const hideChatForUserApi = async (chatId, token) => {
  try {
    await axios.put(`/api/chats/hide/${chatId}`, {}, sendConfig(token));
  } catch (error) {
    throw new Error(error);
  }
};
