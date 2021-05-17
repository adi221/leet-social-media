import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='error-page page page-center'>
      <h1>Sorry, the page isn't available</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.{' '}
        <Link to='/'>Go back home.</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
