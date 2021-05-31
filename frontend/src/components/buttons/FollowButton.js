import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../actions/userActions';
import { SHOW_MODAL } from '../../constants/utilConstants';

const FollowButton = ({
  style = {},
  userId,
  username,
  profileImage,
  colored,
}) => {
  const { following } = useSelector(state => state.userStats);
  const [isFollowing, setIsFollowing] = useState();
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

  const followHandler = () => {
    isFollowing ? unfollowModalHandler() : dispatch(followUser(userId));
  };

  const colorStyle = colored
    ? { color: isFollowing ? '#262626' : '#0095f6' }
    : {};

  return (
    <button
      className='drop button is-primary'
      onClick={followHandler}
      style={{ ...style, ...colorStyle }}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
