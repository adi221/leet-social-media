import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeSidebar = () => {
  const { userInfo } = useSelector(state => state.userLogin);
  if (!userInfo) return null;

  const { username, profileImage, _id, name } = userInfo;

  return (
    <aside className='home-sidebar'>
      <header className='home-sidebar-header is-flexed'>
        <img className='margin-right16' src={profileImage} alt={username} />
        <div>
          <Link to={`/profile/${_id}`} className='bold '>
            {username}
          </Link>
          <p>{name}</p>
        </div>
      </header>
    </aside>
  );
};

export default HomeSidebar;
