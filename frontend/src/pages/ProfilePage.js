import React, { useEffect } from 'react';
import { useParams, NavLink, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGrid3X3, BsBookmark, BsHeart } from 'react-icons/bs';
import { ErrorPage } from '../pages';
import { Loader, ProfileHeader, PrivateRoute } from '../components';
import ProfileContent from '../components/profile/ProfileContent';
import { getUserProfileDetails } from '../actions/userActions';

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileDetails(id));
  }, [dispatch, id]);

  const { user, loading, error } = useSelector(
    state => state.userDetailsProfile
  );
  const { userPosts, userSavedPosts, userLikedPosts, username } = user;

  const { userInfo } = useSelector(state => state.userLogin);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className='profile-page page'>
      <div className='page-center'>
        <ProfileHeader user={user} />
        <div className='profile-page__btns is-flexed'>
          <NavLink
            exact
            to={`/profile/${id}`}
            activeClassName='profile-page__btns--active'
            className='mr-lg is-flexed'
          >
            <BsGrid3X3 /> posts
          </NavLink>
          {userInfo._id === id && (
            <>
              <NavLink
                to={`/profile/${id}/liked`}
                activeClassName='profile-page__btns--active'
                className='mr-lg is-flexed'
              >
                <BsHeart /> liked
              </NavLink>
              <NavLink
                to={`/profile/${id}/saved`}
                activeClassName='profile-page__btns--active'
                className='is-flexed'
              >
                <BsBookmark /> saved
              </NavLink>
            </>
          )}
        </div>
        <main className='profile-page__content'>
          <Switch>
            <PrivateRoute exact path='/profile/:id'>
              <ProfileContent list={userPosts} username={username} />
            </PrivateRoute>
            {userInfo._id === id && (
              <>
                <PrivateRoute path='/profile/:id/liked'>
                  <ProfileContent list={userLikedPosts} username={username} />
                </PrivateRoute>
                <PrivateRoute path='/profile/:id/saved'>
                  <ProfileContent list={userSavedPosts} username={username} />
                </PrivateRoute>
              </>
            )}
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
