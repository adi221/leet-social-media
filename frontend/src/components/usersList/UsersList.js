import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';
import { UsersListSkeleton } from '../../components';
import SingleUserList from './SingleUserList';
import { INITIAL_STATE, usersListReducer } from './usersListReducer';
import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';

const UsersList = ({ userOrPostId, listType, countUsers, users }) => {
  const [state, dispatch] = useReducer(usersListReducer, INITIAL_STATE);
  const usersOrPosts = users ? 'users' : 'posts';
  const componentRef = useRef();

  useScrollPositionThrottled(async ({ atBottom }) => {
    if (
      atBottom &&
      state.data.length < countUsers &&
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
          return <SingleUserList key={user._id} {...user} />;
        })
      )}
      {state.fetchingAdditional && (
        <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
      )}
    </ul>
  );
};

export default UsersList;
