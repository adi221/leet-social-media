import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSearch } from '../../actions/userActions';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { users } = useSelector(state => state.userSearch);

  const queryHandler = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query) return;
    dispatch(getUserSearch(query));
  }, [query, dispatch]);

  useEffect(() => {
    inputRef.current.addEventListener('click', e => {
      e.stopPropagation();
      setShowResults(true);
    });
    document.addEventListener('click', () => {
      setShowResults(false);
    });
  }, []);

  return (
    <div className='search-bar'>
      <input
        placeholder='Search..'
        value={query}
        onChange={queryHandler}
        ref={inputRef}
        className='search is-bordered'
      />
      {showResults && (
        <div className='search-bar-dropdown'>
          {!query ? null : users.length === 0 && query ? (
            <p className='search-no-results'>No results found.</p>
          ) : (
            users.map(user => {
              const { _id, name, username, profileImage } = user;
              return (
                <div className='search-bar-dropdown-item' key={_id}>
                  <Link to={`/profile/${username}`}>
                    <img src={profileImage} alt={username} className='mr-sm' />
                    <div>
                      <p className='bold'>{username}</p>
                      <p>{name}</p>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
