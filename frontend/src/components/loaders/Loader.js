import React from 'react';

const Loader = ({ style = {} }) => {
  return (
    <div className='loader-container'>
      <div className='loader' style={{ ...style }}></div>
    </div>
  );
};

export default Loader;
