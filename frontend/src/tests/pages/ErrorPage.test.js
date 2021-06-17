import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../../pages/ErrorPage';
import { Link } from 'react-router-dom';

test('renders without crashing', () => {
  const component = shallow(<ErrorPage />);
  expect(component.length).toBe(1);
});

test('includes link back to home page', () => {
  const component = shallow(<ErrorPage />);
  expect(component.find(Link).prop('to')).toBe('/');
});
