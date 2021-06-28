import moxios from 'moxios';
import { storeFactory } from '../../../utils/testUtils';
import { getPosts } from '../../../actions/postActions';

describe('get posts', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('sets loading to false and sets potsts and loadedPosts', () => {
    expect.assertions(1);

    const expectedState = {
      posts: [{ _id: '1' }, { _id: '2' }, { _id: '3' }, { _id: '4' }],
    };

    const store = storeFactory({ userLogin: { userInfo: { token: '111' } } });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState.posts,
      });
    });

    return store.dispatch(getPosts()).then(() => {
      const newState = store.getState();
      expect(newState.postsGet).toEqual({
        loading: false,
        posts: expectedState.posts.slice(3),
        loadedPosts: expectedState.posts.slice(0, 3),
      });
    });
  });
});
