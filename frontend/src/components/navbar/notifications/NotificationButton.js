import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notifications from './Notifications';
import NotificationPopup from './NotificationPopup';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const popupTimer = useRef();

  const { unreadCount, notifications } = useSelector(
    state => state.notifications
  );

  useEffect(() => {
    if (popupTimer.current) {
      clearTimeout(popupTimer.current);
      return;
    }
    if (unreadCount > 0) {
      !showNotificationPopup && setShowNotificationPopup(true);
      popupTimer.current = setTimeout(
        () => setShowNotificationPopup(false),
        7000
      );
      console.log(popupTimer.current);
    }
  }, [unreadCount, showNotificationPopup]);

  useEffect(() => {
    if (showNotifications) {
      clearTimeout(popupTimer.current);
      setShowNotificationPopup(false);
    }
  }, [popupTimer, showNotifications]);

  return (
    <div className='drop nav__center--dropdown'>
      <button
        className='drop is-flexed'
        onClick={() => setShowNotifications(!showNotifications)}
      >
        {showNotificationPopup && (
          <NotificationPopup
            numUnreadNotifications={unreadCount}
            notifications={notifications}
          />
        )}
        {showNotifications ? (
          <FaHeart
            className='drop nav__center--dropdown-notification'
            style={{ fill: '#262626' }}
          />
        ) : (
          <FaRegHeart className='drop nav__center--dropdown-notification' />
        )}
      </button>
      {showNotifications && <Notifications />}
    </div>
  );
};

export default NotificationButton;
