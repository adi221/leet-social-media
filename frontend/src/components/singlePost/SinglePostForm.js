import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SINGLE_POST_COMMENT_SUCCESS } from '../../constants/singlePostConstants';

const SinglePostForm = ({ dispatch, uniqueId, commentRef }) => {
  const [addedComment, setAddedComment] = useState('');
  const { userInfo } = useSelector(state => state.userLogin);

  const commentHandler = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/posts/comment/${uniqueId}`,
        { comment: addedComment },
        config
      );

      dispatch({ type: SINGLE_POST_COMMENT_SUCCESS, payload: data });
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
