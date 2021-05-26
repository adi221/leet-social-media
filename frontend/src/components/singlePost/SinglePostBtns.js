import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { USER_BOOKMARKS_SUCCESS } from '../../constants/userConstants';
import { SINGLE_POST_LIKE_SUCCESS } from '../../constants/singlePostConstants';

const SinglePostBtns = ({ uniqueId, likes, commentRef, dispatch }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const dispatchRedux = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const { bookmarks } = useSelector(state => state.userBookmarks);

  useEffect(() => {
    const likedOrNot = likes && likes.some(like => like.user === userInfo._id);
    setIsLiked(likedOrNot);
  }, [likes, userInfo]);

  useEffect(() => {
    const bookmarkedOrNot =
      bookmarks.length > 0 &&
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
      dispatchRedux({ type: USER_BOOKMARKS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='single-post__btns is-flexed '>
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
          className='single-icon'
        />
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
