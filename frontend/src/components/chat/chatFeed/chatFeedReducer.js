export const CHAT_FEED_LOADING = 'CHAT_FEED_LOADING';
export const CHAT_FEED_ERROR = 'CHAT_FEED_ERROR';
export const CHAT_FEED_GET_SUCCESS = 'CHAT_FEED_GET_SUCCESS';

export const INITIAL_STATE = {
  loading: true,
  error: false,
  chatPartners: [
    {
      _id: '',
      username: '',
      profileImage: '',
    },
  ],
  chatType: '',
  messages: [],
  textInput: '',
};

export const chatFeedReducer = (state, action) => {
  switch (action.type) {
    case CHAT_FEED_LOADING:
      return { ...state, loading: true };
    case CHAT_FEED_ERROR:
      return { ...state, loading: false, error: true };
    case CHAT_FEED_GET_SUCCESS:
      const { chatType, messages, partnerDetails } = action.payload;
      if (chatType === 'dual') {
        return {
          ...state,
          loading: false,
          messages,
          chatType,
          chatPartners: { ...partnerDetails },
        };
      }
      return { ...state };
    default:
      return state;
  }
};
