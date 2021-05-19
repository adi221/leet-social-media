import React from 'react';
import { useParams } from 'react-router-dom';
import { SinglePost } from '../components';

const SinglePostPage = () => {
  const { id } = useParams();

  return (
    <div className='single-post-page page is-flexed'>
      <div className='page-center'>
        <SinglePost uniqueId={id} />
      </div>
    </div>
  );
};

export default SinglePostPage;
