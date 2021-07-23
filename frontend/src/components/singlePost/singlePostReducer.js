import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_INPUT_LOADING,
  SINGLE_POST_INPUT_SUCCESS,
  SINGLE_POST_INPUT_ERROR,
  SINGLE_POST_LIKE_SUCCESS,
  SINGLE_POST_COMMENT_SUCCESS,
  SINGLE_POST_COMMENT_LIKE_SUCCESS,
  SINGLE_POST_LOADING_ADDITIONAL,
  SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS,
  SINGLE_POST_GET_ADDITIONAL_COMMENTS_FAIL,
  SINGLE_POST_IS_REPLYING,
  SINGLE_POST_COMMENT_REPLY_SUCCESS,
  SINGLE_POST_ADD_REPLIES_SUCCESS,
  SINGLE_POST_REPLY_LIKE_SUCCESS,
  SINGLE_POST_DELETE_COMMENT_SUCCESS,
  SINGLE_POST_DELETE_REPLY_SUCCESS,
} from '../../constants/singlePostConstants';

export const INITIAL_STATE = {
  loading: true,
  error: false,
  loadingAdditionalComments: false,
  author: {
    profileImage: '',
    username: '',
  },
  post: {
    _id: '',
    tags: [],
    description: '',
    image: '',
    likes: [],
    comments: [],
    createdAt: '',
    user: '',
    commentCount: 0,
  },
  replying: null,
  inputLoading: false,
};

export const singlePostReducer = (state, action) => {
  switch (action.type) {
    case SINGLE_POST_LOADING:
      return { ...state, loading: true, error: false };
    case SINGLE_POST_ERROR:
      return { ...state, loading: false, error: true };
    case SINGLE_POST_GET_SUCCESS:
      const { author, ...post } = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        post,
        author,
      };
    case SINGLE_POST_INPUT_LOADING:
      return { ...state, inputLoading: true };
    case SINGLE_POST_INPUT_SUCCESS:
      return { ...state, inputLoading: false };
    case SINGLE_POST_INPUT_ERROR:
      return { ...state, inputLoading: false };
    case SINGLE_POST_LIKE_SUCCESS:
      return { ...state, post: { ...state.post, likes: action.payload } };
    case SINGLE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload],
          commentCount: state.post.commentCount + 1,
        },
      };
    case SINGLE_POST_COMMENT_LIKE_SUCCESS:
      const { commentId, type, userId } = action.payload;
      const newComments = state.post.comments.map(comment => {
        if (comment._id === commentId) {
          if (type === 'add') {
            comment.commentLikes.push({ user: userId });
          } else {
            comment.commentLikes = comment.commentLikes.filter(
              user => user.user.toString() !== userId.toString()
            );
          }
        }
        return comment;
      });
      return {
        ...state,
        post: {
          ...state.post,
          comments: newComments,
        },
      };
    case SINGLE_POST_LOADING_ADDITIONAL:
      return { ...state, loadingAdditionalComments: true };
    case SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS:
      const { comments: additionalComments } = action.payload;
      return {
        ...state,
        loadingAdditionalComments: false,
        post: {
          ...state.post,
          comments: [...additionalComments, ...state.post.comments],
        },
      };
    case SINGLE_POST_GET_ADDITIONAL_COMMENTS_FAIL:
      return {
        ...state,
        loadingAdditionalComments: false,
      };
    case SINGLE_POST_IS_REPLYING:
      // action.payload can be null if we want to remove else user and comment details
      if (action.payload) {
        const { username, commentId } = action.payload;
        // prevent unnessecary rerendering
        if (
          state.replying &&
          state.replying.commentId === commentId &&
          state.replying.commentUsername === username
        ) {
          return state;
        }

        return {
          ...state,
          replying: { commentUsername: username, commentId },
        };
      } else {
        return { ...state, replying: null };
      }
    case SINGLE_POST_COMMENT_REPLY_SUCCESS:
      const newCommentReply = action.payload;
      const modifiedComments = state.post.comments.map(comment => {
        if (comment._id === newCommentReply.parentComment) {
          comment.commentReplies.push(newCommentReply);
          comment.commentRepliesCount += 1;
          return comment;
        }
        return comment;
      });

      return {
        ...state,
        replying: null,
        post: { ...state.post, comments: modifiedComments },
      };
    case SINGLE_POST_ADD_REPLIES_SUCCESS:
      const { parentCommentId, replies } = action.payload;
      const updatedComments = state.post.comments.map(comment => {
        if (comment._id === parentCommentId) {
          comment.commentReplies.push(...replies);
          return comment;
        }
        return comment;
      });
      return { ...state, post: { ...state.post, comments: updatedComments } };
    case SINGLE_POST_REPLY_LIKE_SUCCESS:
      const {
        replyId,
        type: addOrDelType,
        userLikeId,
        parentComment,
      } = action.payload;
      const newCommentReplies = state.post.comments.map(comment => {
        if (comment._id === parentComment) {
          comment.commentReplies = comment.commentReplies.map(reply => {
            if (reply._id === replyId) {
              if (addOrDelType === 'add') {
                reply.replyLikes.push({ user: userLikeId });
              } else {
                reply.replyLikes = reply.replyLikes.filter(
                  user => user.user.toString() !== userLikeId.toString()
                );
              }
            }
            return reply;
          });
        }
        return comment;
      });
      return {
        ...state,
        post: {
          ...state.post,
          comments: newCommentReplies,
        },
      };
    case SINGLE_POST_DELETE_COMMENT_SUCCESS:
      const updatedCommentsDelete = state.post.comments.filter(
        comment => comment._id !== action.payload
      );
      return {
        ...state,
        post: { ...state.post, comments: updatedCommentsDelete },
      };
    case SINGLE_POST_DELETE_REPLY_SUCCESS:
      const updatedCommentsDeleteReply = state.post.comments.map(comment => {
        if (comment._id === action.payload.parentCommentId) {
          comment.commentReplies = comment.commentReplies.filter(
            reply => reply._id !== action.payload.replyId
          );
          comment.commentRepliesCount -= 1;
        }
        return comment;
      });
      return {
        ...state,
        post: { ...state.post, comments: updatedCommentsDeleteReply },
      };
    default:
      return state;
  }
};
