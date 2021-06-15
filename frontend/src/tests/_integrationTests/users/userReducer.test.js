import { userLoginReducer } from '../../../reducers/userReducers';

test('returns initial state when no action is passed', () => {
  const newState = userLoginReducer(undefined, {});
  expect(newState).toEqual({ userInfo: null });
});

test('returns expected state when USER_LOGIN_SUCCESS is passed', () => {
  const payload = {
    _id: '1',
    username: 'test',
    name: 'test name',
    email: 'test@example.com',
    profileImage: 'test.jpg',
    description: 'test description',
    token: 'token123',
  };
  const newState = userLoginReducer(undefined, {
    type: 'USER_LOGIN_SUCCESS',
    payload,
  });

  expect(newState).toEqual({
    userInfo: payload,
    loading: false,
  });
});

test('returns expected state when USER_LOGIN_FAIL is passed', () => {
  const error = { success: false, message: 'Invalid email or password' };
  const newState = userLoginReducer(undefined, {
    type: 'USER_LOGIN_FAIL',
    payload: error.message,
  });

  expect(newState).toEqual({
    error: error.message,
    userInfo: null,
    loading: false,
  });
});
