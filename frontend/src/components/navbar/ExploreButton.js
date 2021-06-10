import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaRegCompass, FaCompass } from 'react-icons/fa';

const ExploreButton = () => {
  const { pathname } = useLocation();

  return (
    <div className='nav__center--link is-flexed'>
      <Link
        to='/explore'
        className='nav__center--button is-flexed'
        style={{ fontSize: '1.7rem' }}
      >
        {pathname.startsWith('/explore') ? (
          <FaCompass style={{ fill: '#262626' }} />
        ) : (
          <FaRegCompass />
        )}
      </Link>
    </div>
  );
};

export default ExploreButton;
