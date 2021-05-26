import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorPage } from '../pages';
import { SinglePost, HomeSidebar, Loader } from '../components';
import { getPosts } from '../actions/postActions';
import { getUserBookmarks } from '../actions/userActions';

const HomePage = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUserBookmarks(userInfo._id));
  }, [dispatch, userInfo]);

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
        <aside className='sidebar'>
          <div className='sidebar__content'>
            <HomeSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
