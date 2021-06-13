import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useScrollPositionThrottled from '../../../hooks/useScrollPositionThrottled';
import SingleChatMessage from './SingleChatMessage';
import { getAdditionalMessages } from '../../../actions/chatActions';

const ChatFeedMessages = ({ partnerTypingId, chatId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const msgBoxRef = useRef();

  const {
    loading,
    fetchingAdditional,
    hasMoreMessages,
    messages,
    partners,
    chatType,
  } = useSelector(state => state.chatFeed);

  // Scroll bottom on mounting, when new message is added, or partner is typing
  useEffect(() => {
    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
  }, [loading, partnerTypingId]);

  useEffect(() => {
    msgBoxRef.current.addEventListener('scroll', () => {
      console.log(msgBoxRef.current.scrollHeight, msgBoxRef.current.scrollTop);
    });
  }, [msgBoxRef]);

  // For fetching additional messages
  useScrollPositionThrottled(
    ({ atTop }) => {
      if (atTop && hasMoreMessages && !fetchingAdditional && !loading) {
        console.log('Its okay');
        dispatch(getAdditionalMessages(chatId, messages.length));
      }
    },
    msgBoxRef.current,
    [hasMoreMessages, fetchingAdditional, loading]
  );

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
