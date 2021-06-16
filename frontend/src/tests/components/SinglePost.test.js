import React from 'react';
import { shallow } from 'enzyme';
import {
  storeFactory,
  checkProps,
  findByTestAttr,
} from '../../utils/testUtils';
import SinglePost from '../../components/singlePost/SinglePost';

const defaultProps = {
  uniqueId: '12314',
  simple: false,
};
