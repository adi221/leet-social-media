import React from 'react';

const Tags = ({ tags }) => {
  return (
    <div className='single-post-tags'>
      {tags.map((tag, index) => {
        return (
          <span key={index} className='tag'>
            #{tag}
          </span>
        );
      })}
    </div>
  );
};

export default Tags;
