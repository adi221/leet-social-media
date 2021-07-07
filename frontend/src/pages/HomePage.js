import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorPage } from '../pages';
import {
  HomeSidebar,
  Loader,
  Feed,
  HomeSuggestions,
  ScrollTopButton,
} from '../components';
import useScrollPositionThrottled from '../hooks/useScrollPositionThrottled';
import { getPosts, clearPosts } from '../actions/postActions';
import { getUserStats } from '../actions/userActions';
import { POSTS_ADD_LOADED } from '../constants/postConstants';

const HomePage = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const postsGet = useSelector(state => state.postsGet);
  const { posts, loading, error, loadedPosts } = postsGet;

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUserStats(userInfo._id));

    return () => clearPosts();
  }, [dispatch, userInfo]);

  useScrollPositionThrottled(
    ({ atBottom }) => {
      if (atBottom && posts && posts.length > 0) {
        dispatch({ type: POSTS_ADD_LOADED });
      }
    },
    null,
    []
  );

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className='page home-page' data-test='page-home'>
      {!loading && posts.length === 0 && loadedPosts.length === 0 ? (
        <HomeSuggestions />
      ) : (
        <div className='page-center home-page__container'>
          <Feed />
          <aside className='sidebar'>
            <div className='sidebar__content'>
              <HomeSidebar />
            </div>
          </aside>
        </div>
      )}
      <ScrollTopButton />
    </div>
  );
};

export default HomePage;
