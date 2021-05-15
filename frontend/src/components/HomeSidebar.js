import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeSidebar = () => {
  const { userInfo } = useSelector(state => state.userLogin);
  if (!userInfo) return null;

  const { username, profileImage } = userInfo;

  return (
    <aside className='home-sidebar'>
      <header className='home-sidebar-header is-flexed'>
        <img className='margin-right16' src={profileImage} alt={username} />
        <Link to={`/profile/${username}`} className='bold underline'>
          {username}
        </Link>
      </header>
    </aside>
  );
};

export default HomeSidebar;
