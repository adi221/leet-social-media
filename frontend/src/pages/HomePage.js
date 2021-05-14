import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SinglePost, HomeSidebar } from '../components';
import { getPosts } from '../actions/postActions';

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const postsGet = useSelector(state => state.postsGet);
  const { posts, loading, error } = postsGet;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  return (
    <div className='page home-page'>
      <div className='page-center'>
        {/* Home Sidebar */}
        <HomeSidebar />
        {/* Posts */}
        <div className='posts-container is-flexed'>
          {posts &&
            posts.map(post => {
              return <SinglePost key={post._id} post={post} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
