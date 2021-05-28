import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserSuggestions from './UserSuggestions';

const HomeSidebar = () => {
  const { userInfo } = useSelector(state => state.userLogin);

  const { username, profileImage, _id, name } = userInfo;
  return (
    <article className='home-sidebar'>
      <header className='home-sidebar__header'>
        <img className='mr-sm' src={profileImage} alt={username} />
        <div>
          <Link to={`/profile/${_id}`} className='bold '>
            {username}
          </Link>
          <p>{name}</p>
        </div>
      </header>
      <UserSuggestions />
      <footer className='home-sidebar-footer'>
        @{new Date().getFullYear()} Leet social media <br /> By{' '}
        <a
          href='https://github.com/adi221'
          target='_blank'
          rel='noopener noreferrer'
        >
          Adi Mizrahi
        </a>
      </footer>
    </article>
  );
};

export default HomeSidebar;
