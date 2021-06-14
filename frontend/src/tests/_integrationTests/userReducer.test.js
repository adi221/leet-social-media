import { login } from '../../actions/userActions';
import { userLoginReducer } from '../../reducers/userReducers';

test('returns initial state when no action is passed', () => {
  const newState = userLoginReducer(undefined, {});
  expect(newState).toEqual({ userInfo: null });
});
