import {
  singlePostReducer,
  INITIAL_STATE,
} from '../../../components/singlePost/singlePostReducer';

const comment = {
  createdAt: '123213',
  comment: 'This is a comment',
  commentLikes: [],
  commentReplies: [],
  commentRepliesCount: 0,
  author: { username: 'sas', profileImage: 'image.png', _id: '121' },
  _id: '231332320',
};

const post = {
  _id: '12123',
  tags: [],
  description: 'asd',
  image: 'image.png',
  likes: [],
  comments: [comment],
  createdAt: '213123',
  user: '',
  commentCount: 0,
};

const author = { profileImage: 'image.png', _id: '213213' };

const seededState = {
  loading: true,
  error: false,
  loadingAdditionalComments: false,
  replying: null,
  inputLoading: false,
};

test('returns current state when an invalid action is passed', () => {
  expect(singlePostReducer(INITIAL_STATE, { type: 'test' })).toEqual(
    INITIAL_STATE
  );
});

test('returns expected state when SINGLE_POST_ERROR is passed', () => {
  const expectedState = { ...INITIAL_STATE, error: true, loading: false };
  const newState = singlePostReducer(INITIAL_STATE, {
    type: 'SINGLE_POST_ERROR',
  });
  expect(newState).toEqual(expectedState);
});

test('returns expected state when SINGLE_POST_SUCCESS is passed', () => {
  const expectedState = { ...INITIAL_STATE, loading: false, author, post };
  const newState = singlePostReducer(INITIAL_STATE, {
    type: 'SINGLE_POST_SUCCESS',
    payload: { ...post, author },
  });
  expect(newState).toEqual(expectedState);
});
