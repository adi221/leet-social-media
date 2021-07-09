import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSearchUsersDebounced from '../../hooks/useSearchUsersDebounced';
import useComponentVisible from '../../hooks/useComponentVisible';
import UsersListSkeleton from '../loaders/UsersListSkeleton';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const {
    ref,
    isComponentVisible: showResults,
    setIsComponentVisible: setShowResults,
  } = useComponentVisible(false);

  let { handleSearchDebouncedRef, result, setResult, fetching, setFetching } =
    useSearchUsersDebounced();

  const onChangeHandler = e => {
    let value = e.target.value;
    setQuery(value);
    if (!value) return;
    // useDebouncedUserSearch properties
    setFetching(true);
    // Setting the result to an empty array to show skeleton
    setResult([]);
    handleSearchDebouncedRef(value);
  };

  const renderSearchDropdown = () => {
    if (!showResults || !query) return null;
    if (fetching) {
      return (
        <UsersListSkeleton
          style={{ width: '20rem', backgroundColor: 'white' }}
        />
      );
    }
    if (query && result.length === 0) {
      return <p className='empty-search'>No results found.</p>;
    }

    return result.map(user => {
      const { _id, name, username, profileImage } = user;
      return (
        <div className='search-bar__dropdown--item' key={_id}>
          <Link to={`/profile/${username}`}>
            <img src={profileImage} alt={username} className='mr-sm' />
            <div>
              <p className='bold'>{username}</p>
              <p>{name}</p>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className='search-bar' ref={ref}>
      <input
        placeholder='Search..'
        value={query}
        onChange={onChangeHandler}
        className='search-bar__search is-bordered'
        onClick={() => setShowResults(true)}
      />
      <div className='search-bar__dropdown'>{renderSearchDropdown()}</div>
    </div>
  );
};

export default SearchBar;
