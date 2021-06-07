import React from 'react';
import { Link } from 'react-router-dom';
import { ImInfo } from 'react-icons/im';

const ChatFeedHeader = ({ chatType, chatPartners }) => {
  const { profileImage, username } = chatPartners;

  return (
    <div className='chat-feed__header'>
      <div className='chat-feed__header--user is-flexed'>
        <img src={profileImage} alt={username} />
        <Link className='bold' to={`/profile/${username}`}>
          {username}
        </Link>
      </div>
      <button className='chat-feed__header--info is-flexed'>
        <ImInfo />
      </button>
    </div>
  );
};

export default ChatFeedHeader;
