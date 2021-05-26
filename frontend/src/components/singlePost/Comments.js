import React from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ comments, simple }) => {
  return (
    <div className='single-post__content--comments'>
      {comments.length === 0 && !simple && (
        <p className='bold'>No comments yet</p>
      )}
      {comments.map(c => {
        const { _id, username, comment, user } = c;
        return (
          <p key={_id}>
            <Link to={`/profile/${user}`} className='bold mr-sm underline'>
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
