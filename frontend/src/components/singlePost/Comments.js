import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';
import { getComments } from '../../services/commentService';
import LoaderSpinner from '../loaders/LoaderSpinner';
import SingleComment from './SingleComment';
import {
  SINGLE_POST_LOADING_ADDITIONAL,
  SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS,
  SINGLE_POST_GET_ADDITIONAL_COMMENTS_FAIL,
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
  // To retrigger ref.current - in mounting it equals null and therefore we need to
  // re-set it for useScrollPositionThrottled hook
  const [nodeRef, setNodeRef] = useState(commentBoxRef.current);

  useEffect(() => {
    if (simple) return;
    // Get to the bottom of the comments list when mounting or getting new message
    commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
  }, [simple, postId, commentCount]);

  // to maintain scrollTop when fetching new messages
  const fetchingAdditionalPromise = () =>
    new Promise(resolve => {
      if (!loadingAdditional) resolve();
    });

  // to prevent additional rerendering while useScrollPositionThrottled is in action
  const offsetSet = useRef(new Set()).current;

  useEffect(() => {
    if (nodeRef) return;
    setNodeRef(commentBoxRef.current);
  }, [commentBoxRef, nodeRef]);

  useScrollPositionThrottled(
    async ({ atTop }) => {
      if (
        !simple &&
        atTop &&
        !offsetSet.has(comments.length) &&
        commentCount > comments.length &&
        !loadingAdditional
      ) {
        try {
          dispatch({ type: SINGLE_POST_LOADING_ADDITIONAL });
          const prevHeight = commentBoxRef.current.scrollHeight;
          const data = await getComments(postId, comments.length);
          offsetSet.add(comments.length);
          dispatch({
            type: SINGLE_POST_GET_ADDITIONAL_COMMENTS_SUCCESS,
            payload: data,
          });

          fetchingAdditionalPromise().then(() => {
            if (commentBoxRef.current.scrollTop === 0) {
              commentBoxRef.current.scrollTop =
                commentBoxRef.current.scrollHeight - prevHeight;
            }
          });
        } catch (error) {
          dispatch({ type: SINGLE_POST_GET_ADDITIONAL_COMMENTS_FAIL });
        }
      }
    },
    commentBoxRef.current,
    []
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
      <SingleComment {...description} isDesc={true} />
      {loadingAdditional && <LoaderSpinner />}
      {comments.map(c => {
        return <SingleComment key={c._id} {...c} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default Comments;
