import React from 'react';
import UsersListSkeleton from '../loaders/UsersListSkeleton';

const SearchSuggestions = ({ fetching, result, onClick, username }) => {
  const renderSingleUser = user => {
    const { name, profileImage, username } = user;

    return (
      <div
        className='search-suggestions__user'
        onClick={() => onClick(username)}
      >
        <img src={profileImage} alt={username} />
        <div>
          <p className='bold'>{username}</p>
          <p>{name}</p>
        </div>
      </div>
    );
  };

  return (
    <ul className='search-suggestions'>
      {fetching ? (
        <UsersListSkeleton />
      ) : (
        result.map(user => {
          return <li key={user._id}>{renderSingleUser(user)}</li>;
        })
      )}
    </ul>
  );
};

export default SearchSuggestions;
