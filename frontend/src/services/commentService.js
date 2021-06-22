import axios from 'axios';

/**
 * Retrieves comments from a post with the given offset
 * @function getComments
 * @param {string} postId The id of a post to retrieve comments from
 * @param {number} offset The amount of comments to skip
 * @param {number} exclude The amount of comments to exlude (newest to oldest)
 * @returns {array} Array of comment details
 */

export const getComments = async (postId, offset = 0, exclude = 0) => {
  try {
    const { data } = await axios.get(`/api/comments/${postId}/${offset}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
