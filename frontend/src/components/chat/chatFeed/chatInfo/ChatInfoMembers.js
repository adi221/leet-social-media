import React from 'react';
import { Link } from 'react-router-dom';

const ChatInfoMembers = ({ partners }) => {
  return (
    <div className='chat-info__members'>
      <div className='chat-info__members--header'>
        <h4>Members</h4>
        {partners.length > 1 && (
          <button className='chat-info__members--header-add bold '>
            Add People
          </button>
        )}
      </div>
      <div>
        {partners.map(partner => {
          const { _id, name, username, profileImage } = partner;
          return (
            <Link
              to={`/profile/${username}`}
              className='chat-info__members--partner '
              key={_id}
            >
              <img src={profileImage} alt={username} />
              <div>
                <p className='bold'>{username}</p>
                <p className='light-grey'>{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatInfoMembers;
