import React, { useEffect } from 'react';
import PreviewImage from '../components/previewImage/PreviewImage';
import Loader from '../components/loaders/Loader';
import { ErrorPage } from '../pages';
import { useSelector, useDispatch } from 'react-redux';
import { getExplorePostPreviews } from '../actions/postActions';
import { useHistory } from 'react-router-dom';

const ExplorePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, postPreviews } = useSelector(
    state => state.postsExplore
  );
  useEffect(() => {
    dispatch(getExplorePostPreviews(0));
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className='page explore-page'>
      <div className='explore-page__grid page-center'>
        {postPreviews.map(post => {
          const { image, postOwnerUsername, comments, likes, _id } = post;
          return (
            <PreviewImage
              key={_id}
              image={image}
              likes={likes}
              comments={comments}
              onClick={() => history.push(`/posts/${postOwnerUsername}/${_id}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePage;
