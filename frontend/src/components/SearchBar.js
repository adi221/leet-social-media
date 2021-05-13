import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const queryHandler = e => {
    setQuery(e.target.value);
  };

  return (
    <input
      placeholder='Search..'
      value={query}
      onChange={queryHandler}
      className='search is-bordered'
    />
  );
};

export default SearchBar;
