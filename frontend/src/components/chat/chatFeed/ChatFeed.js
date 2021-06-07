import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChatFeedInbox from './ChatFeedInbox';
import ChatFeedHeader from './ChatFeedHeader';
import ChatFeedForm from './ChatFeedForm';
import ChatFeedMessages from './ChatFeedMessages';
import { getChatFeed } from '../../../actions/chatActions';
import Loader from '../../loaders/Loader';

const ChatFeed = () => {
  const { pathname } = useLocation();
  const { chatId } = useParams();
  const [partnerTyping, setPartnerTyping] = useState(false);

  const dispatch = useDispatch();
  const {
    chatPartners,
    chatType,
    messages,
    loading,
    error,
    chatPartnersTyping,
  } = useSelector(state => state.chatFeed);

  useEffect(() => {
    if (chatId && pathname !== '/direct/inbox') {
      dispatch(getChatFeed(chatId));
    }
  }, [chatId, pathname, dispatch]);

  useEffect(() => {
    const isTyping = chatPartnersTyping.some(
      partner => partner.chatId === chatId && partner.typing
    );
    setPartnerTyping(isTyping);
  }, [chatPartnersTyping, chatId]);

  if (pathname === '/direct/inbox') return <ChatFeedInbox />;
  if (loading) {
    return (
      <div className='chat-feed'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='chat-feed'>
        <p>Chat not found</p>
      </div>
    );
  }

  return (
    <div className='chat-feed'>
      <ChatFeedHeader chatPartners={chatPartners} chatType={chatType} />
      <ChatFeedMessages
        messages={messages}
        thumbnail={chatPartners.profileImage}
        username={chatPartners.username}
        partnerTyping={partnerTyping}
      />
      <ChatFeedForm chatId={chatId} chatPartners={chatPartners} />
    </div>
  );
};

export default ChatFeed;
