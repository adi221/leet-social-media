import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import LoaderSvg from '../loaders/LoaderSvg';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { closeModal } from '../../actions/utilActions';
import { RESET_CHAT_REDIRECT } from '../../constants/chatConstants';
import { createChat } from '../../actions/chatActions';
import { getUserSearch } from '../../actions/userActions';

/**
 * Functional react component to create new chat. If chat exists user will be immediately redirected,
 * else he will be redirected to the newly created chat.
 * @function NewMessageModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const NewMessageModal = props => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { partnerUsersId, redirectChatId, loading } = useSelector(
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
    if (redirectChatId) {
      history.push(`/direct/${redirectChatId}`);
      dispatch(closeModal());
      dispatch({ type: RESET_CHAT_REDIRECT });
    }
  }, [redirectChatId, dispatch, history]);

  const createNewChatHandler = () => {
    dispatch(createChat());
  };

  return (
    <>
      <div className='modal__new-message--title'>
        <button onClick={() => dispatch(closeModal())}>
          <GrClose />
        </button>
        <h3>New Message</h3>
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

NewMessageModal.propTypes = {
  checkButton: PropTypes.bool.isRequired,
  requestType: PropTypes.string.isRequired,
  userOrPostId: PropTypes.string.isRequired,
};

export default NewMessageModal;
