import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatFeedForm = ({ chatId, partners }) => {
  const [addedMessage, setAddedMessage] = useState('');
  const { socket } = useSelector(state => state.socket);

  const { userInfo } = useSelector(state => state.userLogin);

  const messageHandler = e => {
    const value = e.target.value;
    setAddedMessage(value);

    const receiver = {
      chatId,
      fromUser: userInfo._id,
      toUserId: partners.map(p => p._id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit('partnerTyping', receiver);
    }

    if (value.length === 0) {
      receiver.typing = false;
      socket.emit('partnerTyping', receiver);
    }
  };

  const sendMessage = e => {
    e.preventDefault();
    if (!addedMessage) return;

    const msg = {
      fromUser: userInfo._id,
      toUserId: partners.map(p => p._id),
      chatId,
      message: addedMessage,
    };
    socket.emit('message', msg);

    setAddedMessage('');

    const receiver = {
      chatId,
      fromUser: userInfo._id,
      toUserId: partners.map(p => p._id),
      typing: false,
    };
    socket.emit('partnerTyping', receiver);
  };

  return (
    <div className='chat-feed__bottom'>
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
