import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { SHOW_MODAL } from '../../constants/utilConstants';
import { USER_STATS_FOLLOWING } from '../../constants/userConstants';
import LoaderSvg from '../loaders/LoaderSvg';

const FollowButton = ({
  style = {},
  userId,
  username,
  profileImage,
  colored,
}) => {
  const { userInfo } = useSelector(state => state.userLogin);
  const { following } = useSelector(state => state.userStats);

  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFollowing(following.some(user => user.user === userId));
  }, [following, userId]);

  const unfollowModalHandler = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        modalType: 'UNFOLLOW_USER',
        modalProps: {
          userId,
          username,
          profileImage,
        },
      },
    });
  };

  const followUser = () => async (dispatch, getState) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/follow/${userId}`,
        {},
        config
      );
      setLoading(false);
      setIsFollowing(!isFollowing);
      dispatch({ type: USER_STATS_FOLLOWING, payload: data });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const followHandler = () => {
    isFollowing ? unfollowModalHandler() : dispatch(followUser(userId));
  };

  const colorStyle = colored
    ? { color: isFollowing ? '#262626' : '#0095f6' }
    : {};

  return (
    <button
      data-test='component-follow-button'
      className='drop button is-primary'
      onClick={followHandler}
      style={{ ...style, ...colorStyle, position: 'relative' }}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
      {loading && <LoaderSvg />}
    </button>
  );
};

FollowButton.propTypes = {
  style: PropTypes.object,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  colored: PropTypes.bool,
};

export default FollowButton;
