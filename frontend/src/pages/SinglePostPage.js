import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SinglePost } from '../components';
import { CLOSE_MODAL } from '../constants/utilConstants';

const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLOSE_MODAL });
  }, [dispatch]);

  return (
    <div className='single-post-page page is-flexed'>
      <div className='page-center'>
        <SinglePost uniqueId={id} />
      </div>
    </div>
  );
};

export default SinglePostPage;
