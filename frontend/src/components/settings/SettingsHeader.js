import React from 'react';

const SettingsHeader = ({ image, username }) => {
  return (
    <div className='settings-content__header'>
      <img src={image} alt={username} />
      <div className='is-flexed' style={{ alignSelf: 'center' }}>
        <h2>{username}</h2>
      </div>
    </div>
  );
};

export default SettingsHeader;
