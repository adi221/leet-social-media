import React from 'react';
import { Link } from 'react-router-dom';
import { ImInfo } from 'react-icons/im';

const ChatFeedHeader = ({ partners, onClick, showChatInfo }) => {
  return (
    <div className='chat-feed__header'>
      <div className='chat-feed__header--user is-flexed'>
        {showChatInfo ? (
          <h3>Details</h3>
        ) : (
          <>
            {partners.length > 1 ? (
              <div className='chat-feed__header--user-collage'>
                <img
                  className='chat-feed__header--user-collage-img1'
                  src={partners[0].profileImage}
                  alt='username'
                />
                <img
                  className='chat-feed__header--user-collage-img2'
                  src={partners[1].profileImage}
                  alt='username'
                />
              </div>
            ) : (
              <img
                className='chat-feed__header--user-single'
                src={partners[0].profileImage}
                alt='username'
              />
            )}

            {partners.map((partner, index) => {
              const { username } = partner;
              return (
                <Link key={index} className='bold' to={`/profile/${username}`}>
                  {username} {index !== partners.length - 1 && ', '}{' '}
                </Link>
              );
            })}
          </>
        )}
      </div>
      <button
        className={`chat-feed__header--info is-flexed ${
          showChatInfo && 'chat-feed__header--info-show'
        }`}
        onClick={onClick}
      >
        <ImInfo />
      </button>
    </div>
  );
};

export default ChatFeedHeader;
