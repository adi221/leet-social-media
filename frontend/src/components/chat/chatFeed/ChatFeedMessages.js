import React from 'react';
import { useHistory } from 'react-router-dom';
import SingleChatMessage from './SingleChatMessage';

const ChatFeedMessages = ({ messages, thumbnail, username, partnerTyping }) => {
  const history = useHistory();
  const imageHandler = () => {
    history.push(`/profile/${username}`);
  };

  return (
    <div className='chat-feed__messages'>
      {messages.map((message, index) => {
        return (
          <SingleChatMessage
            key={message._id}
            {...message}
            index={index}
            messages={messages}
            thumbnail={thumbnail}
            username={username}
          />
        );
      })}
      {partnerTyping && (
        <div className='chat-feed__messages--message chat-feed__messages--message-other-person'>
          <img
            className='chat-feed__messages--message-img'
            src={thumbnail}
            alt={username}
            onClick={imageHandler}
          />
          <p style={{ color: '#666' }}>Typing...</p>
        </div>
      )}
    </div>
  );
};

export default ChatFeedMessages;
