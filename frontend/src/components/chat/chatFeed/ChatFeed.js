import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChatFeedInbox from './ChatFeedInbox';
import ChatFeedHeader from './ChatFeedHeader';
import ChatFeedForm from './ChatFeedForm';
import ChatFeedMessages from './ChatFeedMessages';
import ChatFeedLoader from '../../loaders/ChatFeedLoader';
import { getChatFeed } from '../../../actions/chatActions';

const ChatFeed = () => {
  const { pathname } = useLocation();
  const { chatId } = useParams();
  const [partnerTypingId, setPartnerTypingId] = useState(null);

  const dispatch = useDispatch();
  const { partners, chatType, messages, loading, error, chatPartnersTyping } =
    useSelector(state => state.chatFeed);
  const { userInfo } = useSelector(state => state.userLogin);
  const { notifications } = useSelector(state => state.chatNotifications);
  const { socket } = useSelector(state => state.socket);

  // fetch chat data
  useEffect(() => {
    if (chatId && pathname !== '/direct/inbox') {
      dispatch(getChatFeed(chatId));
    }
  }, [chatId, pathname, dispatch]);

  // remove chat notification
  useEffect(() => {
    if (!chatId) return;
    if (notifications.includes(chatId)) {
      socket.emit('readChat', { chatId, userId: userInfo._id });
    }
  }, [notifications, chatId, socket, userInfo]);

  // check if partner is typing
  useEffect(() => {
    const isUserTyping = chatPartnersTyping.find(
      partner => partner.chatId === chatId && partner.typing
    );
    if (isUserTyping) {
      setPartnerTypingId(isUserTyping.fromUser);
    } else {
      setPartnerTypingId(null);
    }
  }, [chatPartnersTyping, chatId]);

  if (pathname === '/direct/inbox') return <ChatFeedInbox />;
  if (loading) return <ChatFeedLoader />;
  if (error) {
    return (
      <div className='chat-feed'>
        <p>Chat not found</p>
      </div>
    );
  }

  return (
    <div className='chat-feed'>
      <ChatFeedHeader partners={partners} />
      <ChatFeedMessages
        messages={messages}
        partnerTypingId={partnerTypingId}
        chatType={chatType}
        partners={partners}
      />
      <ChatFeedForm
        chatId={chatId}
        chatPartners={partners[0]}
        partners={partners}
        chatType={chatType}
      />
    </div>
  );
};

export default ChatFeed;
