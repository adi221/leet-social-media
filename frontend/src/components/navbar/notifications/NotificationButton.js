import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from './Notifications';
import NotificationPopup from './NotificationPopup';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { hidePopup } from '../../../actions/notificationActions';

const NotificationButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [popupTimer, setPopupTimer] = useState(null);
  const dispatch = useDispatch();

  const { unreadCount, notifications, showPopup } = useSelector(
    state => state.notifications
  );

  useEffect(() => {
    if (!showPopup) return;
    if (popupTimer) {
      clearTimeout(popupTimer);
    }
    dispatch(hidePopup());
    !showNotificationPopup && setShowNotificationPopup(true);
    setPopupTimer(setTimeout(() => setShowNotificationPopup(false), 7000));
    return () => clearTimeout(popupTimer);
  }, [popupTimer, showPopup, dispatch, showNotificationPopup]);

  useEffect(() => {
    if (showNotifications) {
      clearTimeout(popupTimer);
      setShowNotificationPopup(false);
    }
  }, [popupTimer, showNotifications]);

  return (
    <div className='nav__center--dropdown'>
      <button
        className='is-flexed '
        onClick={() => setShowNotifications(!showNotifications)}
      >
        {showNotificationPopup && (
          <NotificationPopup
            numUnreadNotifications={unreadCount}
            notifications={notifications}
          />
        )}
        {!showNotificationPopup && !showNotifications && unreadCount > 0 && (
          <div className='notification-popup__dot'></div>
        )}
        {showNotifications ? (
          <FaHeart
            className='nav__center--dropdown-notification'
            style={{ fill: '#262626' }}
          />
        ) : (
          <FaRegHeart className='nav__center--dropdown-notification' />
        )}
      </button>
      {showNotifications && <Notifications />}
    </div>
  );
};

export default NotificationButton;
