import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const ChatFeedLoader = () => {
  const renderMessages = () => {
    return Array.from({ length: 10 }, (_, index) => {
      let chatSkeletonStyle = {
        display: 'flex',
        width: '10rem',
        height: '3rem',
        marginBottom: '10px',
        padding: '0.8rem',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
      };

      if (index % 2 === 1) {
        chatSkeletonStyle = { ...chatSkeletonStyle, alignSelf: 'flex-end' };
      }

      return (
        <div
          className='chat-feed__messages--message'
          style={{ chatSkeletonStyle }}
          key={index}
        >
          <SkeletonLoader
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
            }}
          />
          <SkeletonLoader
            style={{
              width: '8.5rem',
              height: '2.5rem',
              marginLeft: '1rem',
              marginBottom: '5px',
              borderRadius: '8px',
            }}
          />
        </div>
      );
    });
  };

  return (
    <div className='chat-feed'>
      <div className='chat-feed__header '>
        <div className='chat-feed__header--user is-flexed '>
          <SkeletonLoader
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SkeletonLoader
              style={{
                width: '6.5rem',
                height: '0.75rem',
                marginLeft: '1rem',
                marginBottom: '5px',
              }}
            />
            <SkeletonLoader
              style={{ width: '14rem', height: '0.75rem', marginLeft: '1rem' }}
            />
          </div>
        </div>
      </div>
      <div
        className='chat-feed_messages '
        style={{ padding: '1rem', width: '100%' }}
      >
        {renderMessages()}
      </div>
      <SkeletonLoader
        animated
        style={{
          width: '90%',
          margin: '0 auto',
          padding: '2rem',
          height: '2rem',
          borderRadius: '30px',
        }}
      />
    </div>
  );
};

export default ChatFeedLoader;
