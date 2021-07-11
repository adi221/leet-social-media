import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../../actions/utilActions';
import { USER_STATS_FOLLOWING } from '../../constants/userConstants';
import LoaderSvg from '../loaders/LoaderSvg';
import { followUserApi } from '../../services/userService';

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
    dispatch(openModal('UNFOLLOW_USER', { userId, username, profileImage }));
  };

  const followUser = async () => {
    try {
      setLoading(true);
      const data = await followUserApi(userId, userInfo.token);

      setIsFollowing(!isFollowing);
      dispatch({ type: USER_STATS_FOLLOWING, payload: data });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const followHandler = () => {
    isFollowing ? unfollowModalHandler() : followUser(userId);
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
