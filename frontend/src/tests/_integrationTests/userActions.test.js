import moxios from 'moxios';
import { storeFactory } from '../../utils/testUtils';
import { login } from '../../actions/userActions';

describe('login action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('sets loading to false and sets userInfo', () => {
    expect.assertions(1);

    const expectedState = {
      _id: '1',
      username: 'test',
      name: 'test name',
      email: 'test@example.com',
      profileImage: 'test.jpg',
      description: 'test description',
      token: 'token123',
    };

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(login('test@example.com', '123456')).then(() => {
      const newState = store.getState();
      expect(newState.userLogin).toEqual({
        userInfo: expectedState,
        loading: false,
      });
    });
  });

  test('sets error and userInfo is null and loading is false', () => {
    expect.assertions(1);
    const store = storeFactory();
    const error = { success: false, message: 'Invalid email or password' };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error,
      });
    });

    return store.dispatch(login()).then(() => {
      const newState = store.getState();
      expect(newState.userLogin).toEqual({
        error: error.message,
        userInfo: null,
        loading: false,
      });
    });
  });
});
