// Differences between singlePostConstans and postConstants = singlePost is relevant
// to solely one post(useReducer of each post) while post is relevant to all posts(redux)

export const SINGLE_POST_LOADING = 'SINGLE_POST_LOADING';
export const SINGLE_POST_ERROR = 'SINGLE_POST_ERROR';
export const SINGLE_POST_GET_SUCCESS = 'SINGLE_POST_GET_SUCCESS';
export const SINGLE_POST_AUTHOR_DETAILS_SUCCESS =
  'SINGLE_POST_AUTHOR_DETAILS_SUCCESS';
export const SINGLE_POST_LIKE_SUCCESS = 'SINGLE_POST_LIKE_SUCCESS';
export const SINGLE_POST_BOOKMARK_SUCCESS = 'SINGLE_POST_BOOKMARK_SUCCESS';

export const SINGLE_POST_COMMENT_REQUEST = 'SINGLE_POST_COMMENT_REQUEST';
export const SINGLE_POST_COMMENT_SUCCESS = 'SINGLE_POST_COMMENT_SUCCESS';
export const SINGLE_POST_COMMENT_FAIL = 'SINGLE_POST_COMMENT_FAIL';
