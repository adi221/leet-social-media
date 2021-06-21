import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeIcon from '../icons/LikeIcon';
import { formatDateDistance } from '../../helpers/timeHelpers';
import { SINGLE_POST_COMMENT_LIKE_SUCCESS } from '../../constants/singlePostConstants';

// Check if user likes

const SingleMessage = ({
  _id,
  author,
  comment,
  commentLikes,
  createdAt,
  dispatch,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (commentLikes.some(like => like.user === userInfo._id)) {
      setIsLiked(true);
    }
  }, [commentLikes, userInfo]);

  const likeCommentHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/comments/like/${_id}`, {}, config);
      // dispatch new action to singlePostReducer
      // if (isLiked) {
      //   dispatch({
      //     type: SINGLE_POST_COMMENT_LIKE_SUCCESS,
      //     payload: { commentId: _id, type: 'del' },
      //   });
      // } else {
      //   dispatch({
      //     type: SINGLE_POST_COMMENT_LIKE_SUCCESS,
      //     payload: { commentId: _id, type: 'inc' },
      //   });
      // }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={_id} className='single-message'>
      <img src={author.profileImage} alt={author.username} />
      <div className='single-message__details'>
        <div className='single-message__details--user'>
          <Link to={`/profile/${author.username}`} className='bold underline'>
            {author.username}
          </Link>
          {comment}
        </div>
        <div className='single-message__details--info'>
          <p> {formatDateDistance(createdAt)}</p>
          {commentLikes.length > 0 && <p>{commentLikes.length} likes</p>}
          <p>reply</p>
        </div>
      </div>
      <LikeIcon
        isLiked={isLiked}
        styleClass='single-message__like'
        onClick={likeCommentHandler}
      />
    </div>
  );
};

export default SingleMessage;
