import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoaderSvg from '../loaders/LoaderSvg';
import useSearchUsersDebounced from '../../hooks/useSearchUsersDebounced';
import SearchSuggestions from './SearchSuggestions';
import { showAlert } from '../../actions/utilActions';
import {
  createComment,
  createCommentReply,
} from '../../services/commentService';
import {
  SINGLE_POST_COMMENT_SUCCESS,
  SINGLE_POST_COMMENT_REPLY_SUCCESS,
  SINGLE_POST_IS_REPLYING,
  SINGLE_POST_INPUT_LOADING,
  SINGLE_POST_INPUT_SUCCESS,
  SINGLE_POST_INPUT_ERROR,
} from '../../constants/singlePostConstants';

const SinglePostForm = ({
  dispatch,
  uniqueId,
  commentRef,
  replying,
  inputLoading,
}) => {
  const [addedComment, setAddedComment] = useState('');
  const [mention, setMention] = useState(true);

  let { handleSearchDebouncedRef, result, setResult, fetching, setFetching } =
    useSearchUsersDebounced();

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (replying && commentRef.current) {
      // commentRef.current.value = `@${replying.commentUsername} `;
      setAddedComment(`@${replying.commentUsername} `);
      commentRef.current.focus();
    }
  }, [replying, commentRef]);

  const commentHandler = async e => {
    e.preventDefault();
    try {
      dispatch({ type: SINGLE_POST_INPUT_LOADING });
      if (!replying) {
        const comment = await createComment(
          uniqueId,
          addedComment,
          userInfo.token
        );
        dispatch({ type: SINGLE_POST_COMMENT_SUCCESS, payload: comment });
      } else {
        const commentReply = await createCommentReply(
          replying.commentId,
          addedComment,
          userInfo.token
        );
        dispatch({
          type: SINGLE_POST_COMMENT_REPLY_SUCCESS,
          payload: commentReply,
        });
      }
      dispatch({ type: SINGLE_POST_INPUT_SUCCESS });
    } catch (error) {
      dispatch({ type: SINGLE_POST_INPUT_ERROR });
      showAlert('Could not post your comment');
    }
    setAddedComment('');
  };

  const onChangeHandler = e => {
    let value = e.target.value;
    setAddedComment(value);
    if (replying && !value) {
      dispatch({ type: SINGLE_POST_IS_REPLYING });
    }
    let lastWord = value.split(' ').pop();
    if (lastWord.match(/@[a-zA-Z]/)) {
      setFetching(true);
      const mention = lastWord.substring(1);
      setMention(mention);
      // Setting the result to an empty array to show skeleton
      setResult([]);
      handleSearchDebouncedRef(mention);
    } else {
      mention && setMention('');
    }
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
        onChange={e => onChangeHandler(e)}
      />
      <button
        className='bold'
        disabled={addedComment.length === 0 || inputLoading}
      >
        Post
        {inputLoading && <LoaderSvg />}
      </button>
      {mention && result && (
        <SearchSuggestions
          fetching={fetching}
          result={result}
          username={mention}
          onClick={username => {
            let comment = commentRef.current.value;
            // replace the last word with mention
            let lastSpaceIndex = comment.lastIndexOf(' ');
            setAddedComment(
              `${comment.substring(0, lastSpaceIndex)} @${username} `
            );
            commentRef.current.focus();
            setResult(null);
            setMention('');
          }}
        />
      )}
    </form>
  );
};

export default SinglePostForm;
