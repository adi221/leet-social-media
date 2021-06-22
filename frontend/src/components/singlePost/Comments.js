import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';
import { getComments } from '../../services/commentService';
import SingleMessage from './SingleMessage';
import {
  SINGLE_POST_LOADING_ADDITIONAL,
  SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS,
} from '../../constants/singlePostConstants';

const Comments = ({
  comments,
  simple,
  postId,
  username,
  commentCount,
  dispatch,
  description,
  loadingAdditional,
}) => {
  const commentBoxRef = useRef();

  useEffect(() => {
    if (simple) return;
    // Get to the bottom of the comments list when mounting or getting new message
    commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
  }, [simple, comments, postId]);

  useScrollPositionThrottled(
    async ({ atTop }) => {
      if (atTop && commentCount > comments.length && !loadingAdditional) {
        // dispatch({ type: SINGLE_POST_LOADING_ADDITIONAL });

        const data = await getComments(postId, comments.length);
        console.log(data);
        // dispatch({
        //   type: SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS,
        //   payload: data,
        // });
      }
    },
    commentBoxRef.current,
    [commentCount, loadingAdditional]
  );

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
    <div
      className='single-post__content--comments'
      ref={commentBoxRef}
      style={{ marginTop: '0.5rem' }}
    >
      <SingleMessage {...description} isDesc={true} />
      {comments.map(c => {
        return <SingleMessage key={c._id} {...c} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default Comments;
