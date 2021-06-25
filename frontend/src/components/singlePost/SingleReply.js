import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LikeIcon from '../icons/LikeIcon';
import OptionsIcon from '../icons/OptionsIcon';
import { formatDateDistance } from '../../helpers/timeHelpers';
import {
  likeCommentReply,
  deleteCommentReply,
} from '../../services/commentService';
import {
  SINGLE_POST_REPLY_LIKE_SUCCESS,
  SINGLE_POST_DELETE_REPLY_SUCCESS,
} from '../../constants/singlePostConstants';
import { openModal, closeModal, showAlert } from '../../actions/utilActions';

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

  const dispatchRedux = useDispatch();

  useEffect(() => {
    if (replyLikes && replyLikes.some(like => like.user === userInfo._id)) {
      setIsLiked(true);
    }
  }, [replyLikes, userInfo]);

  const replyLikeHandler = async () => {
    try {
      await likeCommentReply(_id, userInfo.token);
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

  const handleDeleteReply = async () => {
    try {
      await deleteCommentReply(_id, userInfo.token);
      dispatch({
        type: SINGLE_POST_DELETE_REPLY_SUCCESS,
        payload: { parentCommentId: parentComment, replyId: _id },
      });
      dispatchRedux(closeModal());
      dispatchRedux(showAlert('Reply successfully deleted'));
    } catch (error) {
      dispatchRedux(showAlert('Could not delete reply, please try again'));
    }
  };

  const commentOptionsHandler = () => {
    dispatchRedux(
      openModal('COMMENT_OPTIONS', {
        type: 'deleteCommentReply',
        deleteHandler: handleDeleteReply,
      })
    );
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
          <p>{formatDateDistance(createdAt)}</p>
          {replyLikes.length > 0 && <p>{replyLikes.length} likes</p>}
          <button onClick={() => console.log('TODO')}>reply</button>
        </div>
      </div>
      {userInfo._id === author._id && (
        <OptionsIcon
          styleClass='single-comment__open-modal'
          onClick={commentOptionsHandler}
        />
      )}
      <LikeIcon
        isLiked={isLiked}
        styleClass='single-comment__like'
        onClick={replyLikeHandler}
      />
    </div>
  );
};

export default SingleReply;
