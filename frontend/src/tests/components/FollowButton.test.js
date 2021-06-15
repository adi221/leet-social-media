import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAtrr, checkProps } from '../../utils/testUtils';
import FollowButton from '../../components/buttons/FollowButton';

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
configure({ adapter: new Adapter() });

// describe('render', () => {
//   it('renders without error', () => {
//     const wrapper = setup();
//     const component = findByTestAtrr(wrapper, 'followButtonComponent');
//     expect(component.exists()).toBeTruthy();
//   });
// });

describe('Checking PropTypes', () => {
  it('should not throw error with expected errors', () => {
    const result = checkProps(FollowButton, expectedProps);
    expect(result).toBeUndefined();
  });
});
