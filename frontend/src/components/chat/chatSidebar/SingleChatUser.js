import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { formatDateDistance } from '../../../helpers/timeHelpers';

const SingleChatUser = ({ partners, _id: chatId, lastMessage }) => {
  const [unreadChat, setUnreadChat] = useState(false);
  const [userTypingId, setUserTypingId] = useState(null);
  const { pathname } = useLocation();

  const { userInfo } = useSelector(state => state.userLogin);
  const { notifications } = useSelector(state => state.chatNotifications);
  const { chatPartnersTyping } = useSelector(state => state.chatFeed);

  useEffect(() => {
    if (notifications.includes(chatId)) {
      setUnreadChat(true);
    } else {
      setUnreadChat(false);
    }
  }, [notifications, chatId]);

  useEffect(() => {
    const isTyping = chatPartnersTyping.find(
      partner => partner.chatId === chatId && partner.typing
    );
    if (isTyping) {
      setUserTypingId(isTyping.fromUser);
    } else {
      setUserTypingId(null);
    }
  }, [chatPartnersTyping, chatId]);

  const determineLastMessageOwner = id => {
    if (id === userInfo._id) return userInfo.username;
    const lastMessageOwner = partners.find(partner => partner._id === id);
    return lastMessageOwner ? lastMessageOwner.username : null;
  };

  const renderPostMessage = () => {
    if (partners.length === 1) {
      if (lastMessage.fromUser === userInfo._id) {
        return (
          <p className='chat-sidebar__list--item-last'>
            You sent a post · {formatDateDistance(lastMessage.createdAt)}
          </p>
        );
      } else {
        return (
          <p className='chat-sidebar__list--item-last'>
            Sent a post · {formatDateDistance(lastMessage.createdAt)}
          </p>
        );
      }
    } else {
      return (
        <p className='chat-sidebar__list--item-last'>
          {determineLastMessageOwner(lastMessage.fromUser)} sent a post ·{' '}
          {formatDateDistance(lastMessage.createdAt)}
        </p>
      );
    }
  };

  const renderLastMessage = () => {
    if (!lastMessage)
      return <p className='chat-sidebar__list--item-last'>No messages yet</p>;

    if (lastMessage.messageType && lastMessage.messageType === 'post') {
      return renderPostMessage();
    }

    if (partners.length === 1) {
      return (
        <p className='chat-sidebar__list--item-last'>
          {lastMessage.message.length > 30
            ? lastMessage.message.substring(0, 27) + '...'
            : lastMessage.message}{' '}
          · {formatDateDistance(lastMessage.createdAt)}
        </p>
      );
    } else {
      return (
        <p className='chat-sidebar__list--item-last'>
          {determineLastMessageOwner(lastMessage.fromUser)}:{' '}
          {lastMessage.message.length > 14
            ? lastMessage.message.substring(0, 11) + '...'
            : lastMessage.message}{' '}
          · {formatDateDistance(lastMessage.createdAt)}
        </p>
      );
    }
  };

  const renderUserTyping = () => {
    return (
      <p className='chat-sidebar__list--item-last'>
        {partners.length === 1
          ? 'Typing...'
          : determineLastMessageOwner(userTypingId) + ' typing...'}
      </p>
    );
  };

  return (
    <Link to={`/direct/${chatId}`}>
      <li
        className={`chat-sidebar__list--item ${
          pathname.includes(chatId) && 'chat-sidebar__list--item-selected'
        } `}
      >
        {partners.length > 1 ? (
          <div className='chat-sidebar__list--item-collage'>
            <img
              className='chat-sidebar__list--item-collage-img1'
              src={partners[0].profileImage}
              alt='username'
            />
            <img
              className='chat-sidebar__list--item-collage-img2'
              src={partners[1].profileImage}
              alt='username'
            />
          </div>
        ) : (
          <img
            className='chat-sidebar__list--item-single'
            src={partners[0].profileImage}
            alt='username'
          />
        )}
        <div>
          <p className='chat-sidebar__list--item-partners'>
            {partners.map((partner, index) => {
              return (
                <span key={index}>
                  {partner.username}
                  {index !== partners.length - 1 && ', '}{' '}
                </span>
              );
            })}
          </p>
          {userTypingId ? renderUserTyping() : renderLastMessage()}
        </div>
        {unreadChat && <div className='chat-sidebar__list--item-unread'></div>}
      </li>
    </Link>
  );
};

export default SingleChatUser;
