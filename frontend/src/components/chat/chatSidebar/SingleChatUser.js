import React from 'react';
import { Link } from 'react-router-dom';

const SingleChatUser = ({ partnerDetails, _id: chatId }) => {
  return (
    <Link to={`/direct/${chatId}`}>
      <li className='chat-sidebar__list--item'>
        <img src={partnerDetails.profileImage} alt='username' />
        <p>{partnerDetails.username}</p>
      </li>
    </Link>
  );
};

export default SingleChatUser;
