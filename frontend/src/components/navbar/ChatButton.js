import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiMessengerLine, RiMessengerFill } from 'react-icons/ri';

const ChatButton = () => {
  const { pathname } = useLocation();
  const { unreadCount } = useSelector(state => state.chatNotifications);

  return (
    <div className='nav__center--chat nav__center--link is-flexed'>
      <Link to='/direct/inbox' className='nav__center--button is-flexed'>
        {pathname.startsWith('/direct/') ? (
          <RiMessengerFill style={{ fill: '#262626' }} />
        ) : (
          <RiMessengerLine />
        )}
      </Link>
      {unreadCount > 0 && (
        <div className='nav__center--chat-notification is-flexed'>
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default ChatButton;
