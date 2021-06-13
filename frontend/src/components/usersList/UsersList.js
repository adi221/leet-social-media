import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UsersListSkeleton } from '../../components';
import SingleUserList from './SingleUserList';
import { INITIAL_STATE, usersListReducer } from './usersListReducer';
import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';

const UsersList = ({ userOrPostId, listType, users, checkButton }) => {
  const [state, dispatch] = useReducer(usersListReducer, INITIAL_STATE);
  const usersOrPosts = users ? 'users' : 'posts';
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
        const { data } = await axios.get(
          `/api/${usersOrPosts}/${userOrPostId}/${offset}/${listType}`
        );
        dispatch({ type: 'ADD_USERS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.response.message });
      }
    }
  }, componentRef.current);

  const stateRef = useRef(state.data).current;

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'FETCH_START' });
        const offset = stateRef ? stateRef.length : 0;
        const { data } = await axios.get(
          `/api/${usersOrPosts}/${userOrPostId}/${offset}/${listType}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.response.message });
      }
    })();
  }, [userOrPostId, listType, stateRef, usersOrPosts]);

  return (
    <ul className='modal__users' ref={componentRef}>
      {state.fetching ? (
        <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
      ) : (
        state.data.map(user => {
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
  listType: PropTypes.string.isRequired,
  users: PropTypes.bool.isRequired,
  checkButton: PropTypes.bool.isRequired,
};

export default UsersList;
