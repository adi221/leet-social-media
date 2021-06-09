import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SingleChatMessage from './SingleChatMessage';

const ChatFeedMessages = ({
  messages,
  partnerTypingId,
  partners,
  chatType,
}) => {
  const history = useHistory();
  const msgBoxRef = useRef();

  // Scroll bottom on mounting, when new message is added, or partner is typing
  useEffect(() => {
    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
  }, [messages, partnerTypingId]);

  const imageHandler = username => {
    history.push(`/profile/${username}`);
  };

  const renderPartnerTyping = () => {
    let typingImg, typingUsername;
    if (chatType === 'dual') {
      typingImg = partners[0].profileImage;
      typingUsername = partners[0].username;
    } else {
      let user = partners.find(partner => partner._id === partnerTypingId);
      typingImg = user.profileImage;
      typingUsername = user.username;
    }

    return (
      <div className='chat-feed__messages--message chat-feed__messages--message-other-person'>
        <img
          className='chat-feed__messages--message-img'
          src={typingImg}
          alt={typingUsername}
          onClick={() => imageHandler(typingUsername)}
        />
        <p
          className='chat-feed__messages--message-content'
          style={{ color: '#666' }}
        >
          Typing...
        </p>
      </div>
    );
  };

  return (
    <div className='chat-feed__messages' ref={msgBoxRef}>
      {messages.map((message, index) => {
        return (
          <SingleChatMessage
            key={message._id}
            {...message}
            index={index}
            messages={messages}
            partners={partners}
            chatType={chatType}
          />
        );
      })}
      {partnerTypingId && renderPartnerTyping()}
    </div>
  );
};

export default ChatFeedMessages;
