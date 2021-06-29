import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { UsersListSkeleton } from '../../components';
import SingleUserList from './SingleUserList';
import {
  getUserFollowersApi,
  getUserFollowingApi,
} from '../../services/userService';
import { getPostLikesApi } from '../../services/postService';
import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';
import { INITIAL_STATE, usersListReducer } from './usersListReducer';

const userListRequests = {
  USER_FOLLOWING: getUserFollowingApi,
  USER_FOLLOWERS: getUserFollowersApi,
  POST_LIKES_USERS: getPostLikesApi,
};

const UsersList = ({
  userOrPostId,
  requestType,
  checkButton = false,
  excludeUsers = [],
}) => {
  const [state, dispatch] = useReducer(usersListReducer, INITIAL_STATE);
  const specificRequest = userListRequests[requestType];
  const componentRef = useRef();

  useScrollPositionThrottled(async ({ atBottom }) => {
    if (
      atBottom &&
      state.hasMoreUsers &&
      !state.fetching &&
      !state.fetchingAdditional
    ) {
      try {
        dispatch({ type: 'FETCH_ADDITIONAL_START' });
        const offset = state.data.length;
        const users = await specificRequest(userOrPostId, offset);
        dispatch({ type: 'ADD_USERS', payload: users });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error });
      }
    }
  }, componentRef.current);

  const stateRef = useRef(state.data).current;

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'FETCH_START' });
        const offset = stateRef ? stateRef.length : 0;
        const users = await specificRequest(userOrPostId, offset);
        dispatch({ type: 'FETCH_SUCCESS', payload: users });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error });
      }
    })();
  }, [userOrPostId, stateRef, specificRequest]);

  return (
    <ul className='modal__users' ref={componentRef}>
      {state.fetching ? (
        <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
      ) : (
        state.data.map(user => {
          if (excludeUsers.length > 0 && excludeUsers.includes(user._id)) {
            return null;
          }
          return (
            <SingleUserList
              key={user._id}
              {...user}
              checkButton={checkButton}
            />
          );
        })
      )}
      {state.fetchingAdditional && (
        <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
      )}
    </ul>
  );
};

UsersList.propTypes = {
  userOrPostId: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
  checkButton: PropTypes.bool,
  excludeUsers: PropTypes.array,
};

export default UsersList;
