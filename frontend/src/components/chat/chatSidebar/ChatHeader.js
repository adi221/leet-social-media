import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { openModal } from '../../../actions/utilActions';

const ChatHeader = () => {
  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();

  const openMessageModalHandler = () => {
    dispatch(
      openModal('NEW_MESSAGE', {
        userOrPostId: userInfo._id,
        requestType: 'USER_FOLLOWING',
        checkButton: true,
      })
    );
  };

  return (
    <header className='chat-sidebar__header'>
      <h3>{userInfo.username}</h3>
      <button
        className='chat-sidebar__header--button is-flexed'
        onClick={openMessageModalHandler}
      >
        <FaRegEdit />
      </button>
    </header>
  );
};

export default ChatHeader;
