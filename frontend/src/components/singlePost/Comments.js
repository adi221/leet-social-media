import React from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ comments, simple, postId, username }) => {
  if (simple) {
    if (comments.length === 0) return null;

    return (
      <div className='single-post__content--comments'>
        <Link
          to={`/posts/${username}/${postId}`}
          className='single-post__content--comments-link'
        >
          View all {comments.length} comments
        </Link>
        {comments.slice(0, 3).map(c => {
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
  }

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
