import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorPage } from '../pages';
import { SinglePost, HomeSidebar, Loader } from '../components';
import { getPosts } from '../actions/postActions';

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const postsGet = useSelector(state => state.postsGet);
  const { posts, loading, error } = postsGet;

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className='page home-page'>
      <div className='page-center home-grid'>
        <div className='posts-container is-flexed'>
          {posts &&
            posts.map(id => {
              return <SinglePost key={id} uniqueId={id} />;
            })}
        </div>
        <HomeSidebar />
      </div>
    </div>
  );
};

export default HomePage;
