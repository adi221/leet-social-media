import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LikeIcon from '../icons/LikeIcon';
import OptionsIcon from '../icons/OptionsIcon';
import SingleReply from './SingleReply';
import HashtagAtComment from './HashtagAtComment';
import { formatDateDistance } from '../../helpers/timeHelpers';
import {
  SINGLE_POST_COMMENT_LIKE_SUCCESS,
  SINGLE_POST_IS_REPLYING,
  SINGLE_POST_ADD_REPLIES_SUCCESS,
  SINGLE_POST_DELETE_COMMENT_SUCCESS,
} from '../../constants/singlePostConstants';
import {
  likeComment,
  getCommentReplies,
  deleteComment,
} from '../../services/commentService';
import { openModal, closeModal, showAlert } from '../../actions/utilActions';

const SingleComment = ({
  _id,
  author,
  comment,
  commentLikes,
  commentReplies,
  commentRepliesCount,
  createdAt,
  dispatch,
  isDesc = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const dispatchRedux = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (commentLikes && commentLikes.some(like => like.user === userInfo._id)) {
      setIsLiked(true);
    }
  }, [commentLikes, userInfo]);

  const likeCommentHandler = async () => {
    try {
      await likeComment(_id, userInfo.token);
      // dispatch new action to singlePostReducer
      const delOrIncLikeCount = isLiked ? 'del' : 'add';
      dispatch({
        type: SINGLE_POST_COMMENT_LIKE_SUCCESS,
        payload: {
          commentId: _id,
          type: delOrIncLikeCount,
          userId: userInfo._id,
        },
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const replyCommentHandler = () => {
    dispatch({
      type: SINGLE_POST_IS_REPLYING,
      payload: { commentId: _id, username: author.username },
    });
  };

  const getCommentRepliesHandler = async () => {
    // open/close - all replies are loaded so toggle
    if (commentReplies.length === commentRepliesCount) {
      setShowReplies(!showReplies);
    } else {
      try {
        // get new replies and open if not opened yet
        const replies = await getCommentReplies(_id, commentReplies.length);
        dispatch({
          type: SINGLE_POST_ADD_REPLIES_SUCCESS,
          payload: { replies, parentCommentId: _id },
        });
        !showReplies && setShowReplies(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(_id, userInfo.token);
      dispatch({
        type: SINGLE_POST_DELETE_COMMENT_SUCCESS,
        payload: _id,
      });
      dispatchRedux(closeModal());
      dispatchRedux(showAlert('Message successfully deleted'));
    } catch (error) {
      dispatchRedux(showAlert('Could not delete comment, please try again'));
    }
  };

  const determineReplyDescription = () => {
    if (!showReplies) {
      return `View replies (${commentRepliesCount})`;
    } else if (commentReplies.length === commentRepliesCount && showReplies) {
      return 'Hide replies';
    } else {
      return `View replies (${commentRepliesCount - commentReplies.length})`;
    }
  };

  const commentOptionsHandler = () => {
    dispatchRedux(
      openModal('COMMENT_OPTIONS', {
        type: 'deleteComment',
        deleteHandler: handleDeleteComment,
      })
    );
  };

  return (
    <>
      <div className='single-comment'>
        <img src={author.profileImage} alt={author.username} />
        <div className='single-comment__details'>
          <div className='single-comment__details--user'>
            <Link to={`/profile/${author.username}`} className='bold underline'>
              {author.username}
            </Link>
            <HashtagAtComment comment={comment} isTagged={isDesc} />
          </div>
          <div className='single-comment__details--info'>
            <p> {formatDateDistance(createdAt)}</p>
            {!isDesc && commentLikes.length > 0 && (
              <p>{commentLikes.length} likes</p>
            )}
            {!isDesc && <button onClick={replyCommentHandler}>reply</button>}
          </div>
        </div>
        {!isDesc && userInfo._id === author._id && (
          <OptionsIcon
            styleClass='single-comment__open-modal'
            onClick={commentOptionsHandler}
          />
        )}
        {!isDesc && (
          <LikeIcon
            isLiked={isLiked}
            styleClass='single-comment__like'
            onClick={likeCommentHandler}
          />
        )}
      </div>
      {commentRepliesCount > 0 && (
        <button
          className='single-comment__toggle'
          onClick={getCommentRepliesHandler}
        >
          <span className='single-comment__toggle--dash'></span>
          {determineReplyDescription()}
        </button>
      )}
      {showReplies && (
        <div className='single-comment__replies'>
          {commentReplies.map(reply => {
            return (
              <SingleReply
                key={reply._id}
                {...reply}
                dispatch={dispatch}
                parentComment={_id}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default SingleComment;
