import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, showAlert } from '../../../actions/utilActions';

const SingleChatMessagePopup = ({ hideOptions, messageId, chatId, userId }) => {
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const unsendMessage = () => {
    socket.emit('unsendMessage', { messageId, chatId, userId });
    dispatch(closeModal());
    hideOptions();
    showAlert('Message deleted');
  };

  const unsendModalHandler = () => {
    dispatch(openModal('UNSEND_MESSAGE', { unsendMessage }));
  };

  return (
    <div className='chat-feed__messages--message-popup'>
      <p onClick={unsendModalHandler}>Unsend</p>
    </div>
  );
};

export default SingleChatMessagePopup;
