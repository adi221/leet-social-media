import React from 'react';
import { ChatFeed, ChatSidebar } from '../components';

const ChatPage = () => {
  return (
    <div className='chat-page page'>
      <div className='page-center chat-page__container'>
        <ChatSidebar />
        <ChatFeed />
      </div>
    </div>
  );
};

export default ChatPage;
