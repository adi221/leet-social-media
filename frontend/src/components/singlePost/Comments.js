import React from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ comments }) => {
  return (
    <div className='single-post-comments'>
      {comments.map(c => {
        const { _id, username, comment } = c;
        return (
          <p key={_id}>
            <Link
              to={`/profile/${username}`}
              className='bold margin-right16 underline'
            >
              {username}
            </Link>
            {comment}
          </p>
        );
      })}
    </div>
  );
};

export default Comments;
