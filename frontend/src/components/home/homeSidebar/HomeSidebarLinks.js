import React from 'react';

const links = [
  'About',
  'Help',
  'Press',
  'API',
  'Jobs',
  'Privacy',
  'Terms',
  'Locations',
  'Top Accounts',
  'Hashtags',
  'Language',
];

const HomeSidebarLinks = () => {
  return (
    <div className='home-sidebar__links'>
      {links.map((link, index) => {
        return (
          <p key={index}>
            {link} <span>{index !== links.length - 1 && '·'}</span>
          </p>
        );
      })}
    </div>
  );
};

export default HomeSidebarLinks;
