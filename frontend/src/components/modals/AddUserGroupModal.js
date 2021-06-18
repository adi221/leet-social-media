import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import LoaderSvg from '../loaders/LoaderSvg';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { closeModal } from '../../actions/utilActions';
import { addUsersToGroup } from '../../actions/chatActions';
import { getUserSearch } from '../../actions/userActions';
import { ADD_USER_GROUP_RESET } from '../../constants/chatConstants';

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

  // close modal after user added and show alert 'Successfully added'
  useEffect(() => {
    if (addUserSuccess) {
      dispatch(closeModal());
      dispatch({ type: ADD_USER_GROUP_RESET });
    }
  }, [dispatch, addUserSuccess]);

  const addNewUsersHandler = () => {
    dispatch(addUsersToGroup(chatId));
  };

  return (
    <>
      <div className='modal__add-user-group--title'>
        <button onClick={() => dispatch(closeModal())}>
          <GrClose />
        </button>
        <h3>Add User</h3>
        <button
          onClick={addNewUsersHandler}
          className='modal__add-user-group--title-next'
          disabled={partnerUsersId && partnerUsersId.length === 0}
        >
          Next
          {loading && <LoaderSvg />}
        </button>
      </div>
      <div className='modal__add-user-group--to'>
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
