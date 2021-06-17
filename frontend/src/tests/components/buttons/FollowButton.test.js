import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import FollowButton from '../../../components/buttons/FollowButton';

const expectedProps = {
  style: {},
  userId: '1',
  username: 'Adi',
  profileImage: 'image.jpg',
  colored: false,
};

const setup = (initialProps = {}) => {
  const setupProps = { ...expectedProps, ...initialProps };
  const wrapper = shallow(<FollowButton {...setupProps} />);
  return wrapper;
};

// describe('render', () => {
//   it('renders without error', () => {
//     const wrapper = setup();
//     const component = findByTestAtrr(wrapper, 'component-follow-button');
//     expect(component.exists()).toBeTruthy();
//   });
// });

describe('Checking PropTypes', () => {
  it('should not throw error with expected errors', () => {
    const result = checkProps(FollowButton, expectedProps);
    expect(result).toBeUndefined();
  });
});
