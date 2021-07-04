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
  post,
  author,
};

test('returns current state when an invalid action is passed', () => {
  expect(singlePostReducer(INITIAL_STATE, { type: 'test' })).toEqual(
    INITIAL_STATE
  );
});

test('returns expected state when `SINGLE_POST_ERROR` is passed', () => {
  const expectedState = { ...INITIAL_STATE, error: true, loading: false };
  const newState = singlePostReducer(INITIAL_STATE, {
    type: 'SINGLE_POST_ERROR',
  });
  expect(newState).toEqual(expectedState);
});

test('returns expected state when `SINGLE_POST_SUCCESS` is passed', () => {
  const expectedState = { ...seededState };
  const newState = singlePostReducer(seededState, {
    type: 'SINGLE_POST_SUCCESS',
    payload: { ...post, author },
  });
  expect(newState).toEqual(expectedState);
});

test('update post`s likes when `SINGLE_POST_LIKE_SUCCESS` is passed', () => {
  const newState = singlePostReducer(seededState, {
    type: 'SINGLE_POST_LIKE_SUCCESS',
    payload: ['112', '213123'],
  });

  expect(newState.post.likes.length).toBe(2);
});

test('update post`s comments when `SINGLE_POST_COMMENT_SUCCESS` is passed', () => {
  const newState = singlePostReducer(seededState, {
    type: 'SINGLE_POST_COMMENT_SUCCESS',
    payload: comment,
  });
  const expectedState = {
    ...seededState,
    post: {
      ...seededState.post,
      comments: [...seededState.post.comments, comment],
      commentCount: seededState.post.commentCount + 1,
    },
  };
  expect(newState).toEqual(expectedState);
});

test('returns expected state when `SINGLE_POST_COMMENT_LIKE_SUCCESS` is passed', () => {
  const { commentId, type, userId } = {
    commentId: comment._id,
    type: 'add',
    userId: '231s',
  };
  const newState = singlePostReducer(seededState, {
    type: 'SINGLE_POST_COMMENT_LIKE_SUCCESS',
    payload: { commentId, type, userId },
  });

  const newComments = seededState.post.comments.map(comment => {
    if (comment._id === commentId) {
      comment.commentLikes.push({ user: userId });
    }
    return comment;
  });

  const expectedState = {
    ...seededState,
    post: {
      ...seededState.post,
      comments: newComments,
    },
  };

  expect(newState).toEqual(expectedState);
});

test('returns expected state when `SINGLE_POST_DELETE_COMMENT_SUCCESS` is passed', () => {
  const newState = singlePostReducer(seededState, {
    type: 'SINGLE_POST_DELETE_COMMENT_SUCCESS',
    payload: comment._id,
  });

  const expectedState = {
    ...seededState,
    post: {
      ...seededState.post,
      comments: seededState.post.comments.filter(c => c._id !== comment._id),
    },
  };

  expect(newState).toEqual(expectedState);
});
