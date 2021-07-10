import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UsersListSkeleton } from '../..';
import useScrollPositionThrottled from '../../../hooks/useScrollPositionThrottled';
import LoaderSpinner from '../../loaders/LoaderSpinner';
import SingleNotification from './SingleNotification';
import {
  getNotifications,
  resetNotifications,
  getAdditionalNotifications,
  readNotifications,
} from '../../../actions/notificationActions';

const Notifications = ({ notificationsRef, show }) => {
  const dispatch = useDispatch();

  const { notifications, loading, hasMoreNotifications, fetchingAdditional } =
    useSelector(state => state.notifications);

  // to prevent additional rerendering while useScrollPositionThrottled is in action
  const notifAmountRef = useRef(notifications.length).current;
  const offsetSet = useRef(new Set()).current;

  useEffect(() => {
    !notifAmountRef && dispatch(getNotifications());
    dispatch(readNotifications());

    return () => {
      dispatch(resetNotifications());
    };
  }, [dispatch, notifAmountRef]);

  useScrollPositionThrottled(
    async ({ atBottom }) => {
      if (
        atBottom &&
        hasMoreNotifications &&
        !offsetSet.has(notifications.length) &&
        !loading &&
        !fetchingAdditional
      ) {
        dispatch(getAdditionalNotifications(notifications.length));
        offsetSet.add(notifications.length);
      }
    },
    notificationsRef.current,
    [notificationsRef.current]
  );

  if (loading)
    return (
      <ul className='drop nav-notifications'>
        <UsersListSkeleton style={{ width: '33rem', padding: '0.5rem' }} />
      </ul>
    );

  if (!show) return null;

  return (
    <ul className='nav-notifications' ref={notificationsRef}>
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
      {fetchingAdditional && <LoaderSpinner />}
    </ul>
  );
};

export default Notifications;
