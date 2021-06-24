import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LikeIcon from '../icons/LikeIcon';
import SingleReply from './SingleReply';
import { formatDateDistance } from '../../helpers/timeHelpers';
import {
  SINGLE_POST_COMMENT_LIKE_SUCCESS,
  SINGLE_POST_IS_REPLYING,
  SINGLE_POST_ADD_REPLIES_SUCCESS,
} from '../../constants/singlePostConstants';
import { likeComment, getCommentReplies } from '../../services/commentService';

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
    // open/close and all replies are loaded so toggle
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
    // TODO: What if there is new comments written
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
            {comment}
          </div>
          <div className='single-comment__details--info'>
            <p> {formatDateDistance(createdAt)}</p>
            {!isDesc && commentLikes.length > 0 && (
              <p>{commentLikes.length} likes</p>
            )}
            {!isDesc && <button onClick={replyCommentHandler}>reply</button>}
          </div>
        </div>
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
          {!showReplies
            ? `View replies (${commentRepliesCount})`
            : 'Hide replies'}
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
