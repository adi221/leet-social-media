import React from 'react';
import ChatHeader from './ChatHeader';
import ChatUsers from './ChatUsers';

const ChatSidebar = () => {
  return (
    <div className='chat-sidebar'>
      <ChatHeader />
      <ChatUsers />
    </div>
  );
};

export default ChatSidebar;
