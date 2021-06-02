import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UsersListSkeleton } from '../../../components';
import { getUserSuggestions } from '../../../actions/userActions';
import SingleUserSuggestion from './SingleUserSuggestion';

const UserSuggestions = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    dispatch(getUserSuggestions(userInfo._id));
  }, [dispatch, userInfo]);
  const { loading, error, suggestions } = useSelector(
    state => state.userSuggestions
  );

  if (error) return null;

  return (
    <div className='home-sidebar__suggestions'>
      <h4>Suggestions for you</h4>
      <div className='home-sidebar__suggestions-container'>
        {loading ? (
          <UsersListSkeleton amount={5} style={{ width: '20rem' }} />
        ) : (
          suggestions.map(suggestion => {
            return (
              <SingleUserSuggestion key={suggestion._id} user={suggestion} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserSuggestions;
