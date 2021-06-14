import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import LoaderSvg from '../loaders/LoaderSvg';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { addUsersToGroup } from '../../actions/chatActions';
import { getUserSearch } from '../../actions/userActions';

const AddUserGroupModal = props => {
  const { chatId } = props;
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const { partnerUsersId, addUserSuccess, loading } = useSelector(
    state => state.createChat
  );
  const { users, loading: searchLoading } = useSelector(
    state => state.userSearch
  );

  // get users from search
  useEffect(() => {
    if (!query) return;
    dispatch(getUserSearch(query));
  }, [query, dispatch]);

  // redirecting after creating new chat
  useEffect(() => {
    if (addUserSuccess) {
      dispatch({ type: CLOSE_MODAL });
    }
  }, [dispatch, addUserSuccess]);

  const createNewChatHandler = () => {
    dispatch(addUsersToGroup(chatId));
  };

  return (
    <>
      <div className='modal__new-message--title'>
        <button onClick={() => dispatch({ type: CLOSE_MODAL })}>
          <GrClose />
        </button>
        <h3>Add User</h3>
        <button
          onClick={createNewChatHandler}
          className='modal__new-message--title-next'
          disabled={partnerUsersId && partnerUsersId.length === 0}
        >
          Next
          {loading && <LoaderSvg />}
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
    </>
  );
};

export default AddUserGroupModal;
