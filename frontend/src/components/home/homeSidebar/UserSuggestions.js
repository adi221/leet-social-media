import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UsersListSkeleton } from '../../../components';
import { getUserSuggestions } from '../../../actions/userActions';
import { getUserSuggestionsApi } from '../../../services/userService';
import SingleUserSuggestion from './SingleUserSuggestion';

const UserSuggestions = ({ offset = 5 }) => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  // const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getUserSuggestionsApi(userInfo._id, offset);
        setSuggestions(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    })();
  }, [userInfo, offset]);

  // useEffect(() => {
  //   dispatch(getUserSuggestions(userInfo._id));
  // }, [dispatch, userInfo]);
  // const { loading, error, suggestions } = useSelector(
  //   state => state.userSuggestions
  // );

  if (error) return null;

  return (
    <div className='home-sidebar__suggestions'>
      <h4>Suggestions for you</h4>
      <div className='home-sidebar__suggestions-container'>
        {loading ? (
          <UsersListSkeleton amount={offset} style={{ width: '20rem' }} />
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
