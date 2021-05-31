import React from 'react';
import { Link } from 'react-router-dom';
import { FollowButton } from '../../../components';

const SingleUserSuggestion = ({ user }) => {
  return (
    <div key={user._id} className='home-sidebar__suggestions-suggestion'>
      <div className='home-sidebar__suggestions-suggestion__info'>
        <img src={user.profileImage} alt={user.username} className='mr-sm' />
        <div>
          <Link to={`/profile/${user._id}`} className='bold underline'>
            {user.username}
          </Link>
          <p>{user.name}</p>
        </div>
      </div>
      <FollowButton
        userId={user._id}
        username={user.username}
        profileImage={user.profileImage}
        style={{
          backgroundColor: 'transparent',
          fontWeight: 'bold',
        }}
        colored
      />
    </div>
  );
};

export default SingleUserSuggestion;
