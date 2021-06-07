import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SingleChatUser = ({ partnerDetails, _id: chatId }) => {
  const { pathname } = useLocation();

  return (
    <Link to={`/direct/${chatId}`}>
      <li
        className={`chat-sidebar__list--item ${
          pathname.includes(chatId) && 'chat-sidebar__list--item-selected'
        } `}
      >
        <img src={partnerDetails.profileImage} alt='username' />
        <p>{partnerDetails.username}</p>
      </li>
    </Link>
  );
};

export default SingleChatUser;
