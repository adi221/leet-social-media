import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UsersListSkeleton } from '../..';
import SingleNotification from './SingleNotification';
import {
  getNotifications,
  resetNotifications,
  readNotifications,
} from '../../../actions/notificationActions';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(state => state.notifications);

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
    <ul className=' nav-notifications'>
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
        <li className=' nav-notifications__item '>
          You don't have notifications
        </li>
      )}
    </ul>
  );
};

export default Notifications;
