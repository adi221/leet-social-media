import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UsersListSkeleton } from '../../../components';
import SingleNotification from './SingleNotification';
import {
  getNotifications,
  resetNotifications,
  readNotifications,
} from '../../../actions/notificationActions';

const NavNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useSelector(
    state => state.notifications
  );

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(readNotifications());

    return () => {
      dispatch(resetNotifications());
    };
  }, [dispatch]);

  if (loading)
    return (
      <ul className='drop nav-notifications'>
        <UsersListSkeleton style={{ width: '33rem', padding: '0.5rem' }} />
      </ul>
    );

  return (
    <ul className='drop nav-notifications'>
      {notifications.length > 0 ? (
        notifications.map(notification => {
          return (
            <SingleNotification
              key={notification._id}
              notification={notification}
            />
          );
        })
      ) : (
        <li className='drop nav-notifications__item '>
          You don't have notifications
        </li>
      )}
    </ul>
  );
};

export default NavNotifications;
