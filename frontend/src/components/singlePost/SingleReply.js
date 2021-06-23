import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LikeIcon from '../icons/LikeIcon';
import { formatDateDistance } from '../../helpers/timeHelpers';
import { likeCommentReply } from '../../services/commentService';
import { SINGLE_POST_REPLY_LIKE_SUCCESS } from '../../constants/singlePostConstants';

const SingleReply = ({
  _id,
  createdAt,
  message,
  parentComment,
  replyLikes,
  author,
  dispatch,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (replyLikes && replyLikes.some(like => like.user === userInfo._id)) {
      setIsLiked(true);
    }
  }, [replyLikes, userInfo]);

  const replyLikeHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await likeCommentReply(_id, config);
      // dispatch new action, if so - convey dispatch as prop
      const delOrIncLikeCount = isLiked ? 'del' : 'add';
      dispatch({
        type: SINGLE_POST_REPLY_LIKE_SUCCESS,
        payload: {
          replyId: _id,
          type: delOrIncLikeCount,
          userLikeId: author._id,
          parentComment,
        },
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='single-comment'>
      <img src={author.profileImage} alt={author.username} />
      <div className='single-comment__details'>
        <div className='single-comment__details--user'>
          <Link to={`/profile/${author.username}`} className='bold underline'>
            {author.username}
          </Link>
          <p>{message}</p>
        </div>
        <div className='single-comment__details--info'>
          <p> {formatDateDistance(createdAt)}</p>
          {replyLikes.length > 0 && <p>{replyLikes.length} likes</p>}
          <button onClick={() => console.log('Hey')}>reply</button>
        </div>
      </div>
      <LikeIcon
        isLiked={isLiked}
        styleClass='single-comment__like'
        onClick={replyLikeHandler}
      />
    </div>
  );
};

export default SingleReply;
