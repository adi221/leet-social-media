import React from 'react';
import { Link } from 'react-router-dom';
import { FollowButton } from '../../../components';
import { formatDateDistance } from '../../../helpers/timeHelpers';

const SingleNotification = ({ notification }) => {
  const {
    senderDetails: { profileImage, username, _id: senderId },
    createdAt,
    notificationType,
    notificationData,
  } = notification;

  const date = formatDateDistance(createdAt);

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
          <FollowButton
            userId={senderId}
            username={username}
            profileImage={profileImage}
          />
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