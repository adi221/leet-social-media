export const CHAT_FEED_LOADING = 'CHAT_FEED_LOADING';
export const CHAT_FEED_ERROR = 'CHAT_FEED_ERROR';
export const CHAT_FEED_GET_SUCCESS = 'CHAT_FEED_GET_SUCCESS';

export const INITIAL_STATE = {
  loading: true,
  error: false,
  chatPartners: [
    {
      username: '',
      profileImage: '',
    },
  ],
  chat: {
    messages: [],
    textInput: '',
  },
};

export const chatFeedReducer = (state, action) => {
  switch (action.type) {
    case CHAT_FEED_LOADING:
      return { ...state, loading: true };
    case CHAT_FEED_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CHAT_FEED_GET_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
