import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { findByTestAttr, mockState } from '../../utils/testUtils';
import HomePage from '../../pages/HomePage';

// https://stackoverflow.com/questions/59346079/using-jest-and-enzyme-to-test-functional-react-components-that-are-using-redux
// https://stackoverflow.com/questions/67633359/how-to-mock-an-async-action-creator-with-jest

const mockStore = configureMockStore([thunk]);

const setup = () => {
  const store = mockStore(mockState);

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
  return wrapper;
};

describe('render HomePage', () => {
  test('should render without error', () => {
    const wrapper = setup();
    const homePage = findByTestAttr(wrapper, 'page-home');
    expect(homePage.length).toBe(1);
  });
});
