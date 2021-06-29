import { postsGetReducer } from '../../../reducers/postReducers';

test('returns initial state when no action is passed', () => {
  const newState = postsGetReducer(undefined, {});
  expect(newState).toEqual({ posts: [], loadedPosts: [] });
});

test('returns expected state when POSTS_GET_SUCCESS is passed', () => {
  const payload = [{ _id: '1' }, { _id: '2' }, { _id: '3' }, { _id: '4' }];

  const newState = postsGetReducer(undefined, {
    type: 'POSTS_GET_SUCCESS',
    payload,
  });
  expect(newState).toEqual({
    posts: payload.slice(3),
    loadedPosts: payload.slice(0, 3),
    loading: false,
  });
});
