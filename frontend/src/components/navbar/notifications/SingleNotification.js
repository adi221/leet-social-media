import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDateDistance } from '../../../helpers/timeHelpers';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/userActions';

const SingleNotification = ({ notification }) => {
  const { following } = useSelector(state => state.userStats);
  const {
    senderDetails: { profileImage, username, _id: senderId },
    createdAt,
    notificationType,
    notificationData,
  } = notification;
  const [isFollowing, setIsFollowing] = useState(
    following.some(user => user.user === senderId)
  );

  const dispatch = useDispatch();
  const date = formatDateDistance(createdAt);

  useEffect(() => {
    if (notificationType !== 'follow') return;
    setIsFollowing(following.some(user => user.user === senderId));
  }, [following, senderId, notificationType]);

  const followHandler = () => {
    isFollowing
      ? dispatch(unfollowUser(senderId))
      : dispatch(followUser(senderId));
  };

  const renderNotification = () => {
    if (notificationType === 'like') {
      return (
        <li className='drop nav-notifications__item'>
          <div className='is-flexed'>
            <img
              className='nav-notifications__item--user-image'
              src={profileImage}
              alt={username}
            />
            <p>
              <Link to={`/profile/${senderId}`} className='bold'>
                {username}
              </Link>{' '}
              liked your post.
              <span className='nav-notifications__item--time'>{date}</span>
            </p>
          </div>
          <img
            className='nav-notifications__item--post-image'
            src={notificationData.postImage}
            alt={username}
          />
        </li>
      );
    } else if (notificationType === 'follow') {
      return (
        <li className='drop nav-notifications__item'>
          <div className='is-flexed'>
            <img
              className='nav-notifications__item--user-image'
              src={profileImage}
              alt={username}
            />
            <p>
              <Link to={`/profile/${senderId}`} className='bold'>
                {username}
              </Link>{' '}
              started following you.
              <span className='nav-notifications__item--time'>{date}</span>
            </p>
          </div>
          <button className='drop button is-primary' onClick={followHandler}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </li>
      );
    } else if (notificationType === 'comment') {
      return (
        <li className='drop nav-notifications__item'>
          <div className='is-flexed'>
            <img
              className='nav-notifications__item--user-image'
              src={profileImage}
              alt={username}
            />
            <p>
              <Link to={`/profile/${senderId}`} className='bold'>
                {username}
              </Link>{' '}
              commented:{' '}
              {notificationData.comment.length > 40
                ? notificationData.comment.substring(0, 35) + ' ...'
                : notificationData.comment}
              <span className='nav-notifications__item--time'>{date}</span>
            </p>
          </div>
          <img
            className='nav-notifications__item--post-image'
            src={notificationData.postImage}
            alt={username}
          />
        </li>
      );
    }
  };

  return renderNotification();
};

export default SingleNotification;
