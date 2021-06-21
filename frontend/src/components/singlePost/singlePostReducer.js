import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_LIKE_SUCCESS,
  SINGLE_POST_COMMENT_SUCCESS,
  SINGLE_POST_COMMENT_LIKE_SUCCESS,
} from '../../constants/singlePostConstants';

const defaultProfileImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

export const INITIAL_STATE = {
  loading: true,
  error: false,
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
      const { commentId, type } = action.payload;
      const newComments = state.post.comments.map(comment => {
        if (comment._id === commentId) {
          type === 'del' ? comment.commnetLikes-- : comment.commnetLikes++;
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
    default:
      return state;
  }
};
