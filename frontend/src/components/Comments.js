import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div className='single-post-comments'>
      {comments.map((comment, index) => {
        return <p key={index}>{comment}</p>;
      })}
    </div>
  );
};

export default Comments;
