import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_AUTHOR_DETAILS_SUCCESS,
  SINGLE_POST_LIKE_SUCCESS,
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
    userId: '',
  },
};

export const singlePostReducer = (state, action) => {
  switch (action.type) {
    case SINGLE_POST_LOADING:
      return { ...state, loading: true };
    case SINGLE_POST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SINGLE_POST_GET_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case SINGLE_POST_AUTHOR_DETAILS_SUCCESS:
      return { ...state, loading: false, author: action.payload };
    case SINGLE_POST_LIKE_SUCCESS:
      return { ...state, post: { ...state.post, likes: action.payload } };
    default:
      return state;
  }
};
