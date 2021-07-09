import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import LoaderSvg from '../loaders/LoaderSvg';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { closeModal } from '../../actions/utilActions';
import { addUsersToGroup } from '../../actions/chatActions';
import { ADD_USER_GROUP_RESET } from '../../constants/chatConstants';
import { showAlert } from '../../actions/utilActions';
import useSearchUsersDebounced from '../../hooks/useSearchUsersDebounced';

/**
 * Functional react component to add new users to group
 * @function AddUserGroupModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const AddUserGroupModal = props => {
  const { chatId } = props;
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const { partners } = useSelector(state => state.chatFeed);
  const { partnerUsersId, addUserSuccess, loading } = useSelector(
    state => state.createChat
  );

  let { handleSearchDebouncedRef, result, setResult, fetching, setFetching } =
    useSearchUsersDebounced();

  // close modal after user added and show alert 'Successfully added'
  useEffect(() => {
    if (addUserSuccess) {
      dispatch(closeModal());
      dispatch({ type: ADD_USER_GROUP_RESET });
      dispatch(showAlert('Successfully added'));
    }
  }, [dispatch, addUserSuccess]);

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

  const addNewUsersHandler = () => {
    dispatch(addUsersToGroup(chatId));
  };

  // users to hide from search result
  const excludeUsers = partners.map(partner => partner._id);

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
          onChange={onChangeHandler}
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
          <UsersList {...props} excludeUsers={excludeUsers} />
        </>
      ) : (
        <>
          {fetching ? (
            <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
          ) : (
            <>
              {result.map(user => {
                if (excludeUsers.includes(user._id)) {
                  return null;
                }

                return <SingleUserList key={user._id} {...user} checkButton />;
              })}
              {!fetching &&
                result.filter(user => !excludeUsers.includes(user._id))
                  .length === 0 && (
                  <p className='empty-search'>No users found</p>
                )}
            </>
          )}
        </>
      )}
    </>
  );
};

AddUserGroupModal.propTypes = {
  chatId: PropTypes.string.isRequired,
  checkButton: PropTypes.bool.isRequired,
  requestType: PropTypes.string.isRequired,
  userOrPostId: PropTypes.string.isRequired,
};

export default AddUserGroupModal;
