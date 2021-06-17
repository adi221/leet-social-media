import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import LoaderSvg from '../loaders/LoaderSvg';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { RESET_POST_RECEIVERS } from '../../constants/postConstants';
import { getUserSearch } from '../../actions/userActions';

const SharePostModal = props => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { postReceiversId } = useSelector(state => state.sharePost);
  const { users, loading: searchLoading } = useSelector(
    state => state.userSearch
  );

  // get users from search
  useEffect(() => {
    if (!query) return;
    dispatch(getUserSearch(query));
  }, [query, dispatch]);

  return (
    <div className='modal__share-post'>
      <div className='modal__new-message--title'>
        <h3>Share</h3>
        <button
          onClick={() => {
            dispatch({ type: CLOSE_MODAL });
            dispatch({ type: RESET_POST_RECEIVERS });
          }}
        >
          <GrClose />
        </button>
      </div>
      <div className='modal__new-message--to'>
        <p className='bold'>To:</p>
        <input
          type='text'
          placeholder='Search...'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {query.length === 0 ? (
        <>
          <p
            className='bold width100'
            style={{ textAlign: 'left', padding: '1rem' }}
          >
            Suggested
          </p>
          <UsersList {...props} />
        </>
      ) : (
        <>
          {searchLoading ? (
            <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
          ) : (
            <>
              {users.map(user => {
                return <SingleUserList key={user._id} {...user} checkButton />;
              })}
              {!searchLoading && users.length === 0 && <p>No users found</p>}
            </>
          )}
        </>
      )}
      <button
        className='modal__share-post-btn  btn is-primary'
        disabled={postReceiversId.length === 0}
      >
        Send
      </button>
    </div>
  );
};

export default SharePostModal;
