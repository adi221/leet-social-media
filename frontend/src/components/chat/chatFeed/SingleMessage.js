import React from 'react';
import { useSelector } from 'react-redux';

const SingleMessage = ({ fromUser, message }) => {
  const { userInfo } = useSelector(state => state.userLogin);

  const determineMessageOwner = () => {
    const isOwner = userInfo._id === fromUser;
    return isOwner
      ? 'chat-feed__messages--message-owner'
      : 'chat-feed__messages--message-other-person';
  };

  return (
    <p className={`chat-feed__messages--message ${determineMessageOwner()}`}>
      {message}
    </p>
  );
};

export default SingleMessage;
