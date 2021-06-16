import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from '../../utils/testUtils';
import HomePage from '../../pages/HomePage';

const setup = (initialState = {}) => {
  const store = storeFactory({ postsGet: { ...initialState } });
  const wrapper = shallow(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
  return wrapper;
};

describe('render HomePage', () => {
  test('should render without error', () => {
    const initialState = {
      loading: false,
      posts: [{ _id: '1' }, { _id: '2' }],
      loadedPosts: [],
    };
    const wrapper = setup(initialState);

    expect(wrapper.length).toBe(1);
    // console.log(wrapper, 'WE');
    // const component = findByTestAtrr(wrapper, 'page-home');
    // // expect(component.length).toBe(1);
    // expect(component.exists()).toBeTruthy();
  });
});
