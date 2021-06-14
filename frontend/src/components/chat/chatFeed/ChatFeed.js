import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChatFeedInbox from './ChatFeedInbox';
import ChatFeedHeader from './ChatFeedHeader';
import ChatFeedForm from './ChatFeedForm';
import ChatFeedMessages from './ChatFeedMessages';
import ChatInfoMembers from './chatInfo/ChatInfoMembers';
import ChatInfoOptions from './chatInfo/ChatInfoOptions';
import ChatFeedLoader from '../../loaders/ChatFeedLoader';
import { getChatFeed } from '../../../actions/chatActions';

const ChatFeed = () => {
  const { pathname } = useLocation();
  const { chatId } = useParams();
  const [partnerTypingId, setPartnerTypingId] = useState(null);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const dispatch = useDispatch();
  const {
    partners,
    loading,
    error,
    chatPartnersTyping,
    currentChatId,
    chatType,
  } = useSelector(state => state.chatFeed);
  const { userInfo } = useSelector(state => state.userLogin);
  const { notifications } = useSelector(state => state.chatNotifications);
  const { socket } = useSelector(state => state.socket);

  // fetch chat data, prevent rerendering if chatId hasnt changed w
  useEffect(() => {
    if (showChatInfo || chatId === currentChatId) return;
    if (chatId && pathname !== '/direct/inbox') {
      dispatch(getChatFeed(chatId));
    }
  }, [chatId, pathname, dispatch, showChatInfo, currentChatId]);

  // remove showChatInfo when chat changes
  useEffect(() => {
    setShowChatInfo(false);
  }, [chatId]);

  // remove chat notification
  useEffect(() => {
    if (!chatId || showChatInfo) return;
    if (notifications.includes(chatId)) {
      socket.emit('readChat', { chatId, userId: userInfo._id });
    }
  }, [notifications, chatId, socket, userInfo, showChatInfo]);

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
    <div className={`chat-feed ${showChatInfo && 'chat-feed__info'}`}>
      <ChatFeedHeader
        partners={partners}
        onClick={() => setShowChatInfo(!showChatInfo)}
        showChatInfo={showChatInfo}
      />
      {showChatInfo ? (
        <>
          <ChatInfoMembers partners={partners} chatId={chatId} />
          <ChatInfoOptions chatId={chatId} chatType={chatType} />
        </>
      ) : (
        <>
          <ChatFeedMessages chatId={chatId} partnerTypingId={partnerTypingId} />
          <ChatFeedForm chatId={chatId} partners={partners} />
        </>
      )}
    </div>
  );
};

export default ChatFeed;
