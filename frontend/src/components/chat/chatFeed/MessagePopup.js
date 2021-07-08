import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, showAlert } from '../../../actions/utilActions';
import { copyClipboard } from '../../../helpers/copyClipboard';

const SingleChatMessagePopup = ({
  hideOptions,
  messageId,
  chatId,
  userId,
  message,
  isOwner,
}) => {
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();

  const unsendMessage = () => {
    socket.emit('unsendMessage', { messageId, chatId, userId });
    dispatch(closeModal());
    hideOptions();
    dispatch(showAlert('Message deleted'));
  };

  const unsendModalHandler = () => {
    dispatch(openModal('UNSEND_MESSAGE', { unsendMessage }));
  };

  const copyClipboardHandler = () => {
    // if message type is post so the argument is post url
    // if(messageType === 'post')
    copyClipboard(message);
    dispatch(showAlert('Message copied'));
    hideOptions();
  };

  return (
    <div className='chat-feed__messages--message-popup'>
      <p onClick={copyClipboardHandler}>Copy</p>
      {isOwner && <p onClick={unsendModalHandler}>Unsend</p>}
    </div>
  );
};

export default SingleChatMessagePopup;
