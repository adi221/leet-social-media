import React from 'react';
import spinner from '../../assets/spinner.gif';

const LoaderSpinner = () => {
  return (
    <>
      <img
        src={spinner}
        style={{
          width: '70px',
          margin: '0 auto',
          display: 'block',
          height: '50px',
        }}
        alt='Loading...'
      />
    </>
  );
};

export default LoaderSpinner;
