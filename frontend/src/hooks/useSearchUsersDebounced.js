import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';

import { getUserSearchApi } from '../services/userService';

/**
 * A memoized debounced hook to search for users with a given offset
 * @function useSearchUsersDebounced
 * @returns {object} Search function and search result
 */
const useSearchUsersDebounced = () => {
  const [result, setResult] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleSearch = async string => {
    if (!string) {
      setFetching(false);
      return setResult([]);
    }

    try {
      const response = await getUserSearchApi(string);
      setResult(response ? response : []);
      setFetching(false);
    } catch (err) {
      setFetching(false);
      throw new Error(err);
    }
  };
  const handleSearchDebounced = debounce(handleSearch, 500);
  const handleSearchDebouncedRef = useRef(string =>
    handleSearchDebounced(string)
  ).current;
  return {
    handleSearchDebouncedRef,
    result,
    setResult,
    fetching,
    setFetching,
  };
};

export default useSearchUsersDebounced;
