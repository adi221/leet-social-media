import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  createComment,
  createCommentReply,
} from '../../services/commentService';
import {
  SINGLE_POST_COMMENT_SUCCESS,
  SINGLE_POST_COMMENT_REPLY_SUCCESS,
} from '../../constants/singlePostConstants';

const SinglePostForm = ({ dispatch, uniqueId, commentRef, replying }) => {
  const [addedComment, setAddedComment] = useState('');
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (replying && commentRef.current) {
      commentRef.current.value = `@${replying.commentUsername} `;
      commentRef.current.focus();
    }
  }, [replying, commentRef]);

  const commentHandler = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (!replying) {
        const comment = await createComment(uniqueId, addedComment, config);
        dispatch({ type: SINGLE_POST_COMMENT_SUCCESS, payload: comment });
        // commentsRef to bottom
        // commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
      } else {
        const commentReply = await createCommentReply(
          replying.commentId,
          addedComment,
          config
        );
        dispatch({
          type: SINGLE_POST_COMMENT_REPLY_SUCCESS,
          payload: commentReply,
        });
      }
    } catch (error) {}
    setAddedComment('');
  };

  return (
    <form
      className='single-post__content--add-comment'
      onSubmit={commentHandler}
    >
      <input
        type='text'
        placeholder='Add a comment..'
        ref={commentRef}
        value={addedComment}
        onChange={e => setAddedComment(e.target.value)}
      />
      <button className='bold' disabled={addedComment.length === 0}>
        Post
      </button>
    </form>
  );
};

export default SinglePostForm;
