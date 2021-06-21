import React from 'react';
import { Link } from 'react-router-dom';
import SingleMessage from './SingleMessage';

const Comments = ({
  comments,
  simple,
  postId,
  username,
  commentCount,
  dispatch,
}) => {
  if (simple) {
    if (commentCount === 0) return null;

    const commentsToShow = comments.length > 2 ? comments.length - 3 : 0;

    return (
      <div className='single-post__content--comments'>
        <Link
          to={`/posts/${username}/${postId}`}
          className='single-post__content--comments-link'
        >
          View all {commentCount} comments
        </Link>
        {comments.slice(commentsToShow).map(c => {
          const { _id, author, comment } = c;
          return (
            <p key={_id}>
              <Link
                to={`/profile/${author.username}`}
                className='bold mr-sm underline'
              >
                {author.username}
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
      {commentCount === 0 && <p className='bold'>No comments yet</p>}
      {comments.map(c => {
        return <SingleMessage key={c._id} {...c} />;
      })}
    </div>
  );
};

export default Comments;
