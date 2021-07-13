import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { UsersListSkeleton } from '../../../components';
import { getUserSuggestionsApi } from '../../../services/userService';
import SingleUserSuggestion from './SingleUserSuggestion';

const UserSuggestions = ({ offset = 5 }) => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const { userInfo } = useSelector(state => state.userLogin);
  // To prevent React state update on an unmounted component
  const didCancel = useRef(false);

  useEffect(() => {
    const getUsers = async () => {
      if (didCancel.current) return;
      try {
        // setLoading(true);
        const data = await getUserSuggestionsApi(userInfo._id, offset);
        setSuggestions(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    getUsers();

    return () => (didCancel.current = true);
  }, [userInfo, offset, suggestions]);

  if (error) return null;

  return (
    <div className='home-sidebar__suggestions'>
      <h4>Suggestions for you</h4>
      <div className='home-sidebar__suggestions-container'>
        {loading ? (
          <UsersListSkeleton amount={offset} style={{ width: '100%' }} />
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
