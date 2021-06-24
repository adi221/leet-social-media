import axios from 'axios';
import { sendConfig } from '../helpers/configHeaders';

/**
 * Retrieves notifications for a user
 * @function getNotifications
 * @param {string} token Authorization token
 * @returns {array} Array of notifications
 */
export const getNotificationsApi = async token => {
  try {
    const { data } = await axios.get(`/api/notifications`, sendConfig(token));
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Update notifications were read by user
 * @function readNotificationsApi
 * @param {string} token Authorization token
 */
export const readNotificationsApi = async token => {
  try {
    await axios.put(`/api/notifications`, {}, sendConfig(token));
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves notifications for a user
 * @function getNotifications
 * @param {string} token Authorization token
 * @returns {array} Array of chatIds that have not read yet
 */
export const getChatNotificationsApi = async token => {
  try {
    const { data } = await axios.get(
      `/api/notifications/chat`,
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
