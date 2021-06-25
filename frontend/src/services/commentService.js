import axios from 'axios';
import { sendConfig } from '../helpers/configHeaders';

/**
 * Creates new comment on a specific post
 * @function createComment
 * @param {string} postId The id of a post to retrieve comments from
 * @param {string} comment The comment to add to the post
 * @param {string} token authorization token
 * @returns {object} The newly created comment
 */
export const createComment = async (postId, comment, token) => {
  try {
    const { data } = await axios.post(
      `/api/comments/${postId}`,
      { comment },
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Like a specific comment of a specific post
 * @function likeComment
 * @param {string} commentId The id of a comment to like
 * @param {string} token authorization token
 */
export const likeComment = async (commentId, token) => {
  try {
    await axios.put(`/api/comments/like/${commentId}`, {}, sendConfig(token));
  } catch (error) {
    throw new Error(error);
  }
};

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
    throw new Error(error);
  }
};

/**
 * Creates new comment on a specific post
 * @function createCommentReply
 * @param {string} parentCommentId The id of a parent comment
 * @param {string} commentReply The comment reply to add to the parent comment
 * @param {string} token authorization token
 * @returns {object} The newly created comment reply
 */
export const createCommentReply = async (
  parentCommentId,
  commentReply,
  token
) => {
  try {
    const { data } = await axios.post(
      `/api/comments/reply/${parentCommentId}`,
      { commentReply },
      sendConfig(token)
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Gets 3 new replies from a parent comment
 * @function getCommentReplies
 * @param {string} parentCommentId The id of a parent comment to get replies from
 * @param {number} offset A number to offset the results
 * @returns {array} Array of replies
 */
export const getCommentReplies = async (parentCommentId, offset = 0) => {
  try {
    const { data } = await axios.get(
      `/api/comments/replies/${parentCommentId}/${offset}`
    );
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Like a specific comment of a specific post
 * @function likeCommentReply
 * @param {string} commentReplyId The id of a comment reply to like
 * @param {string} token authorization token
 */
export const likeCommentReply = async (commentReplyId, token) => {
  try {
    await axios.put(
      `/api/comments/like/reply/${commentReplyId}`,
      {},
      sendConfig(token)
    );
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a comment
 * @function deleteComment
 * @param {string} commentId The id of a comment to delete
 * @param {string} token authorization token
 */
export const deleteComment = async (commentId, token) => {
  try {
    await axios.delete(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a comment reply
 * @function deleteCommentReply
 * @param {string} commentReplyId The id of a comment to delete
 * @param {string} token authorization token
 */
export const deleteCommentReply = async (commentReplyId, token) => {
  try {
    await axios.delete(`/api/comments/reply/${commentReplyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(error);
  }
};
