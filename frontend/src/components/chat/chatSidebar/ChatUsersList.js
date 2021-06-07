import React from 'react';
import { useSelector } from 'react-redux';
import SingleChatUser from './SingleChatUser';
import UsersListSkeleton from '../../loaders/UsersListSkeleton';

const ChatUsersList = () => {
  const { chatList, loading } = useSelector(state => state.chatList);

  if (loading)
    return <UsersListSkeleton amount={12} style={{ width: '24rem' }} />;

  return (
    <ul className='chat-sidebar__list'>
      {chatList &&
        chatList.map(chat => {
          return <SingleChatUser key={chat._id} {...chat} />;
        })}
    </ul>
  );
};

export default ChatUsersList;
