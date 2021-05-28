import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';

const FeedBottom = () => {
  return (
    <div className='feed__bottom'>
      <div className='feed__bottom--dividor'>
        <BiCheckCircle />
      </div>
      <h2>You're All Caught Up</h2>
      <h4>Follow more people to see more posts.</h4>
    </div>
  );
};

export default FeedBottom;
