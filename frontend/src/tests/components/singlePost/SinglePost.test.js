import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { mockState, findByTestAttr } from '../../../utils/testUtils';
import SinglePost from '../../../components/singlePost/SinglePost';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const defaultProps = {
  uniqueId: '12314',
  simple: false,
};

const initialStore = {
  userLogin: { userInfo: { _id: '1', token: '11' } },
};

const mockStore = configureMockStore([thunk]);

const setup = () => {
  const store = mockStore(mockState);
  return mount(
    <Provider store={store}>
      <SinglePost {...defaultProps} />
    </Provider>
  );
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-single-post');
  expect(component.exists()).toBeTruthy();
});

describe('redux props', () => {
  test('has token piece of state as prop', () => {
    const wrapper = setup();
    console.log(wrapper.props());
    expect(wrapper.props()).toBeTruthy();
  });

  // test('has currentUser piece of state as prop', () => {
  //   const wrapper = setup();
  //   expect(wrapper.props()._id).toBe('1');
  // });
});
