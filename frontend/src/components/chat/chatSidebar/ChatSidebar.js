import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChatHeader from './ChatHeader';
import ChatUsersList from './ChatUsersList';
import { getChatLists } from '../../../actions/chatActions';

const ChatSidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatLists());
  }, [dispatch]);

  return (
    <div className='chat-sidebar'>
      <ChatHeader />
      <ChatUsersList />
    </div>
  );
};

export default ChatSidebar;
