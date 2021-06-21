import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import FollowButton from '../../../components/buttons/FollowButton';

const expectedProps = {
  style: {},
  userId: '1',
  username: 'Adi',
  profileImage: 'image.jpg',
  colored: false,
};

const mockStore = configureMockStore([thunk]);

const setup = (initialProps = {}) => {
  const store = mockStore({
    userLogin: { userInfo: { _id: '1', username: '11', profileImage: '' } },
    userStats: { following: [] },
  });

  const setupProps = { ...expectedProps, ...initialProps };
  const wrapper = mount(
    <Provider store={store}>
      <FollowButton {...setupProps} />
    </Provider>
  );
  return wrapper;
};

describe('render', () => {
  it('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-follow-button');
    expect(component.exists()).toBeTruthy();
  });
});

describe('Checking PropTypes', () => {
  it('should not throw error with expected errors', () => {
    const result = checkProps(FollowButton, expectedProps);
    expect(result).toBeUndefined();
  });
});
