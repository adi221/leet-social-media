import React from 'react';
import SingleMessage from './SingleMessage';

const ChatFeedMessages = ({ messages }) => {
  return (
    <div className='chat-feed__messages'>
      {messages.map(message => {
        return <SingleMessage key={message._id} {...message} />;
      })}
    </div>
  );
};

export default ChatFeedMessages;
