import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaRegPaperPlane,
} from 'react-icons/fa';
import { USER_STATS_BOOKMARKS } from '../../constants/userConstants';
import { SINGLE_POST_LIKE_SUCCESS } from '../../constants/singlePostConstants';
import { SHOW_MODAL } from '../../constants/utilConstants';

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
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/posts/like/${uniqueId}`,
        {},
        config
      );
      dispatch({ type: SINGLE_POST_LIKE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/users/save/${uniqueId}`,
        {},
        config
      );
      dispatchRedux({ type: USER_STATS_BOOKMARKS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const sharePostHandler = () => {
    dispatchRedux({
      type: SHOW_MODAL,
      payload: {
        modalType: 'SHARE_POST',
        modalProps: {
          postId: uniqueId,
          userOrPostId: userInfo._id,
          listType: 'following',
          users: true,
          checkButton: true,
        },
      },
    });
  };

  return (
    <div className='single-post__content--btns is-flexed '>
      <div className='is-flexed'>
        {isLiked ? (
          <FaHeart
            onClick={likeHandler}
            className='single-icon mr-sm'
            style={{ fill: '#dd2f3e' }}
          />
        ) : (
          <FaRegHeart onClick={likeHandler} className='single-icon mr-sm' />
        )}
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
