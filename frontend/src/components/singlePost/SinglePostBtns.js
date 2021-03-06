import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaRegPaperPlane,
} from 'react-icons/fa';
import LikeIcon from '../icons/LikeIcon';
import { bookmarkPostApi } from '../../services/userService';
import { likePostApi } from '../../services/postService';
import { USER_STATS_BOOKMARKS } from '../../constants/userConstants';
import { SINGLE_POST_LIKE_SUCCESS } from '../../constants/singlePostConstants';
import { openModal } from '../../actions/utilActions';

const SinglePostBtns = ({ uniqueId, likes, commentRef, dispatch }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const dispatchRedux = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const { bookmarks } = useSelector(state => state.userStats);

  useEffect(() => {
    const likedOrNot = likes && likes.some(like => like.user === userInfo._id);
    setIsLiked(likedOrNot);
  }, [likes, userInfo]);

  useEffect(() => {
    const bookmarkedOrNot =
      bookmarks &&
      bookmarks.some(bookmarkedPost => bookmarkedPost.post === uniqueId);
    setIsBookmarked(bookmarkedOrNot);
  }, [bookmarks, uniqueId]);

  const likeHandler = async () => {
    try {
      const data = await likePostApi(uniqueId, userInfo.token);
      dispatch({ type: SINGLE_POST_LIKE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const data = await bookmarkPostApi(uniqueId, userInfo.token);
      dispatchRedux({ type: USER_STATS_BOOKMARKS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const sharePostHandler = () => {
    dispatchRedux(
      openModal('SHARE_POST', {
        postId: uniqueId,
        userOrPostId: userInfo._id,
        requestType: 'USER_FOLLOWING',
        checkButton: true,
      })
    );
  };

  return (
    <div className='single-post__content--btns is-flexed '>
      <div className='is-flexed'>
        <LikeIcon
          isLiked={isLiked}
          onClick={likeHandler}
          styleClass='single-icon mr-sm'
        />
        <FaRegComment
          onClick={() => commentRef.current.focus()}
          className='single-icon mr-sm'
        />
        <FaRegPaperPlane className='single-icon' onClick={sharePostHandler} />
      </div>
      {isBookmarked ? (
        <FaBookmark className='single-icon' onClick={bookmarkHandler} />
      ) : (
        <FaRegBookmark className='single-icon' onClick={bookmarkHandler} />
      )}
    </div>
  );
};

export default SinglePostBtns;
