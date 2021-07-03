import React from 'react';
import UserSuggestions from '../homeSidebar/UserSuggestions';

const HomeSuggestions = () => {
  return (
    <div className='home-suggestions'>
      <h2 className='home-suggestions__title'>Welcome to Leet Social Media</h2>
      <p className='home-suggestions__subtitle'>
        Follow users to see posts in your feed
      </p>
      <div className='home-suggestions__users'>
        <UserSuggestions offset={20} />
      </div>
      <button
        className='home-suggestions__button button is-primary'
        onClick={() => window.location.reload()}
      >
        Go Home
      </button>
    </div>
  );
};

export default HomeSuggestions;
