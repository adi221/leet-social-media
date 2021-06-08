import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const SingleChatUser = ({ partners, _id: chatId }) => {
  const [unreadChat, setUnreadChat] = useState(false);
  const { pathname } = useLocation();
  const { notifications } = useSelector(state => state.chatNotifications);

  useEffect(() => {
    if (notifications.includes(chatId)) {
      setUnreadChat(true);
    } else {
      setUnreadChat(false);
    }
  }, [notifications, chatId]);

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

        <p>
          {partners.map((partner, index) => {
            return (
              <span key={index}>
                {partner.username}
                {index !== partners.length - 1 && ', '}{' '}
              </span>
            );
          })}
        </p>
        {unreadChat && <div className='chat-sidebar__list--item-unread'></div>}
      </li>
    </Link>
  );
};

export default SingleChatUser;
