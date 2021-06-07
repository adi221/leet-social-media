import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ChatFeedForm = ({ chatId, chatPartners }) => {
  const [addedMessage, setAddedMessage] = useState('');
  const { socket } = useSelector(state => state.socket);

  const { userInfo } = useSelector(state => state.userLogin);

  const messageHandler = e => {
    setAddedMessage(e.target.value);
    // emit message action and add to reducer and
    // empty input
  };

  const sendMessage = e => {
    e.preventDefault();
    if (!addedMessage) return;

    const msg = {
      fromUser: userInfo._id,
      toUserId: chatPartners._id,
      chatId,
      message: addedMessage,
    };
    socket.emit('message', msg);

    setAddedMessage('');
  };

  return (
    <div className='chat-feed__buttom'>
      <form className='chat-feed__form' onSubmit={sendMessage}>
        <input
          type='text'
          placeholder='Message..'
          value={addedMessage}
          onChange={messageHandler}
        />
        <button className='bold' disabled={addedMessage.length === 0}>
          Post
        </button>
      </form>
    </div>
  );
};

export default ChatFeedForm;
