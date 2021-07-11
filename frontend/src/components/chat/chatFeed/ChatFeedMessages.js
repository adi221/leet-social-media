import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useScrollPositionThrottled from '../../../hooks/useScrollPositionThrottled';
import LoaderSpinner from '../../loaders/LoaderSpinner';
import SingleChatMessage from './SingleChatMessage';
import { getAdditionalMessages } from '../../../actions/chatActions';

const ChatFeedMessages = ({ partnerTypingId, chatId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const msgBoxRef = useRef();

  // To retrigger ref.current - in mounting it equals null and therefore we need to
  // re-set it for useScrollPositionThrottled hook
  const [nodeRef, setNodeRef] = useState(msgBoxRef.current);

  // to maintain scrollTop when fetching new messages
  const fetchingAdditionalPromise = () =>
    new Promise(resolve => {
      if (!fetchingAdditional) resolve();
    });

  // to prevent additional rerendering while useScrollPositionThrottled is in action
  const offsetSet = useRef(new Set()).current;

  const {
    loading,
    fetchingAdditional,
    hasMoreMessages,
    messages,
    partners,
    chatType,
    currentChatId,
  } = useSelector(state => state.chatFeed);

  // Scroll bottom on mounting, when new message is added, or partner is typing
  useEffect(() => {
    msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
  }, [loading, partnerTypingId]);

  useEffect(() => {
    if (nodeRef) return;
    setNodeRef(msgBoxRef.current);
  }, [msgBoxRef, nodeRef]);

  // For fetching additional messages
  useScrollPositionThrottled(
    async ({ atTop }) => {
      if (
        atTop &&
        hasMoreMessages &&
        !offsetSet.has(messages.length) &&
        !fetchingAdditional &&
        !loading
      ) {
        const prevHeight = msgBoxRef.current.scrollHeight;
        dispatch(getAdditionalMessages(chatId, messages.length));
        offsetSet.add(messages.length);

        fetchingAdditionalPromise().then(() => {
          if (msgBoxRef.current.scrollTop === 0) {
            msgBoxRef.current.scrollTop =
              msgBoxRef.current.scrollHeight - prevHeight;
          }
        });
      }
    },
    msgBoxRef.current,
    []
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
      {fetchingAdditional && <LoaderSpinner />}
      {messages.map((message, index) => {
        return (
          <SingleChatMessage
            key={message._id}
            {...message}
            index={index}
            messages={messages}
            partners={partners}
            chatType={chatType}
            chatId={currentChatId}
          />
        );
      })}

      {partnerTypingId && renderPartnerTyping()}
    </div>
  );
};

export default ChatFeedMessages;
