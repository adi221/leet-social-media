import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_LIKE_SUCCESS,
  SINGLE_POST_COMMENT_SUCCESS,
  SINGLE_POST_COMMENT_LIKE_SUCCESS,
  SINGLE_POST_LOADING_ADDITIONAL,
  SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS,
} from '../../constants/singlePostConstants';

const defaultProfileImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

export const INITIAL_STATE = {
  loading: true,
  error: false,
  loadingAdditionalComments: false,
  author: {
    profileImage: defaultProfileImage,
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
  replying: false,
};

export const singlePostReducer = (state, action) => {
  switch (action.type) {
    case SINGLE_POST_LOADING:
      return { ...state, loading: true };
    case SINGLE_POST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SINGLE_POST_GET_SUCCESS:
      const { author, ...post } = action.payload;
      return {
        ...state,
        loading: false,
        post,
        author,
      };
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
    default:
      return state;
  }
};
