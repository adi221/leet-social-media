import React from 'react';
import { FaComment, FaHeart, FaUser } from 'react-icons/fa';

const NotificationPopup = ({ numUnreadNotifications, notifications }) => {
  let newComments = 0;
  let newLikes = 0;
  let newFollowers = 0;

  notifications.slice(0, numUnreadNotifications).forEach(notification => {
    if (
      notification.notificationType === 'comment' ||
      notification.notificationType === 'mention'
    ) {
      newComments += 1;
    } else if (notification.notificationType === 'like') {
      newLikes += 1;
    } else if (notification.notificationType === 'follow') {
      newFollowers += 1;
    }
  });

  return (
    <div className='notification-popup'>
      {newComments > 0 && (
        <div>
          <FaComment /> {newComments}
        </div>
      )}
      {newLikes > 0 && (
        <div>
          <FaHeart /> {newLikes}
        </div>
      )}
      {newFollowers > 0 && (
        <div>
          <FaUser /> {newFollowers}
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
