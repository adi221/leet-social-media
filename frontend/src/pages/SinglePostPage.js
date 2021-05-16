import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SinglePost, Loader } from '../components';
import { getSinglePostDetails } from '../actions/postActions';

const SinglePostPage = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  const { post, error, loading } = useSelector(state => state.singlePostGet);

  useEffect(() => {
    dispatch(getSinglePostDetails(id));
  }, [id, dispatch]);

  if (loading) return <Loader />;

  return (
    <div className='single-posy-page page is-flexed'>
      <div className='page-center'>
        <SinglePost post={post} />
      </div>
    </div>
  );
};

export default SinglePostPage;
