import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { closeModal, showAlert } from '../../actions/utilActions';
import {
  RESET_POST_RECEIVERS,
  SHARE_POST_RESET,
} from '../../constants/postConstants';
import useSearchUsersDebounced from '../../hooks/useSearchUsersDebounced';

/**
 * Functional react component to send a post message.
 * @function SharePostModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const SharePostModal = props => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.socket);
  const { userInfo } = useSelector(state => state.userLogin);
  const { postReceiversId, success } = useSelector(state => state.sharePost);

  let { handleSearchDebouncedRef, result, setResult, fetching, setFetching } =
    useSearchUsersDebounced();

  // sharePost success - show alert and close modal and reset success
  useEffect(() => {
    if (success) {
      dispatch(closeModal());
      dispatch({ type: SHARE_POST_RESET });
      dispatch(showAlert('Sent'));
    }
  }, [success, dispatch]);

  const sharePostHandler = () => {
    if (postReceiversId.length === 0) return;

    const msg = {
      fromUser: userInfo._id,
      postId: props.postId,
      postReceiversId,
    };

    socket.emit('sharePostMessage', msg);
  };

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

  return (
    <div className='modal__share-post'>
      <div className='modal__new-message--title'>
        <h3>Share</h3>
        <button
          onClick={() => {
            dispatch(closeModal());
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
          <UsersList {...props} />
        </>
      ) : (
        <>
          {fetching ? (
            <UsersListSkeleton style={{ width: 'min(420px, 95vw)' }} />
          ) : (
            <>
              {result.map(user => {
                return <SingleUserList key={user._id} {...user} checkButton />;
              })}
              {!fetching && result.length === 0 && <p>No users found</p>}
            </>
          )}
        </>
      )}
      <button
        className='modal__share-post-btn  btn is-primary'
        disabled={postReceiversId.length === 0}
        onClick={sharePostHandler}
      >
        Send
      </button>
    </div>
  );
};

SharePostModal.propTypes = {
  postId: PropTypes.string.isRequired,
  userOrPostId: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
  checkButton: PropTypes.bool.isRequired,
};

export default SharePostModal;
