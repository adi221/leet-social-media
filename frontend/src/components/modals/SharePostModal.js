import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import SingleUserList from '../usersList/SingleUserList';
import UsersListSkeleton from '../loaders/UsersListSkeleton';
import { closeModal } from '../../actions/utilActions';
import {
  RESET_POST_RECEIVERS,
  SHARE_POST_RESET,
} from '../../constants/postConstants';
import { getUserSearch } from '../../actions/userActions';

const SharePostModal = props => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.socket);
  const { userInfo } = useSelector(state => state.userLogin);
  const { postReceiversId, success } = useSelector(state => state.sharePost);
  const { users, loading: searchLoading } = useSelector(
    state => state.userSearch
  );

  // sharePost success - show alert and close modal and reset success
  useEffect(() => {
    if (success) {
      dispatch(closeModal());
      dispatch({ type: SHARE_POST_RESET });
    }
  }, [success, dispatch]);

  // get users from search
  useEffect(() => {
    if (!query) return;
    dispatch(getUserSearch(query));
  }, [query, dispatch]);

  const sharePostHandler = () => {
    if (postReceiversId.length === 0) return;

    const msg = {
      fromUser: userInfo._id,
      postId: props.postId,
      postReceiversId,
    };

    socket.emit('sharePostMessage', msg);
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
        onClick={sharePostHandler}
      >
        Send
      </button>
    </div>
  );
};

export default SharePostModal;
