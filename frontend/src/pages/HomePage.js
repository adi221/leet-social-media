import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SinglePost, HomeSidebar } from '../components';
import {
  POST_COMMENT_RESET,
  POST_LIKE_RESET,
} from '../constants/postConstants';
import { getPosts } from '../actions/postActions';

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      return history.push('/login');
    }
  }, [userInfo, history]);

  const { success: successLike } = useSelector(state => state.postLike);
  const { success: successComment } = useSelector(state => state.postComment);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, successComment, successLike]);

  const postsGet = useSelector(state => state.postsGet);
  const { posts, loading, error } = postsGet;

  return (
    <div className='page home-page'>
      <div className='page-center home-grid'>
        <div className='posts-container is-flexed'>
          {posts &&
            posts.map(post => {
              return <SinglePost key={post._id} post={post} />;
            })}
        </div>
        <HomeSidebar />
      </div>
    </div>
  );
};

export default HomePage;
