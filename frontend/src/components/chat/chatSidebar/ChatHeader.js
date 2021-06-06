import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { SHOW_MODAL } from '../../../constants/utilConstants';

const ChatHeader = () => {
  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();

  const openMessageModalHandler = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        modalType: 'NEW_MESSAGE',
        modalProps: {
          userOrPostId: userInfo._id,
          listType: 'following',
          countUsers: 3,
          users: true,
          checkButton: true,
        },
      },
    });
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
