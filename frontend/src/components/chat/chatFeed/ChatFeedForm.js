import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ChatFeedForm = () => {
  const [addedMessage, setAddedMessage] = useState('');
  const socket = useSelector(state => state.socket);

  const messageHandler = e => {
    e.preventDefault();
    // emit message action and add to reducer and
    // empty input
  };

  const sendMessage = e => {
    setAddedMessage(e.target.value);
  };

  return (
    <div className='chat-feed__buttom'>
      <form className='chat-feed__form' onSubmit={sendMessage}>
        <input
          type='text'
          placeholder='Add a comment..'
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
