import React, { useEffect } from 'react';
import { useParams, NavLink, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGrid3X3, BsBookmark, BsHeart } from 'react-icons/bs';
import { ErrorPage } from '../pages';
import { Loader, ProfileHeader, PrivateRoute } from '../components';
import ProfileContent from '../components/profile/ProfileContent';
import {
  getUserProfileDetails,
  getUserProfileRelatedPosts,
} from '../actions/userActions';

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    dispatch(getUserProfileDetails(username));
    if (userInfo.username === username) {
      dispatch(getUserProfileRelatedPosts(username));
    }
  }, [dispatch, username, userInfo]);

  const { user, loading, error } = useSelector(
    state => state.userDetailsProfile
  );
  const { userPosts, userSavedPosts, userLikedPosts, _id } = user;

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <div className='profile-page page'>
      <div className='page-center'>
        <ProfileHeader user={user} />
        <div className='profile-page__btns is-flexed'>
          <NavLink
            exact
            to={`/profile/${username}`}
            activeClassName='profile-page__btns--active'
            className='mr-lg is-flexed'
          >
            <BsGrid3X3 /> posts
          </NavLink>
          {userInfo._id === _id && (
            <>
              <NavLink
                to={`/profile/${username}/liked`}
                activeClassName='profile-page__btns--active'
                className='mr-lg is-flexed'
              >
                <BsHeart /> liked
              </NavLink>
              <NavLink
                to={`/profile/${username}/saved`}
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
            <PrivateRoute exact path='/profile/:username'>
              <ProfileContent
                list={userPosts}
                username={username}
                currentProfile={userInfo.username === username}
              />
            </PrivateRoute>
            {userInfo._id === _id && (
              <>
                <PrivateRoute path='/profile/:username/liked'>
                  <ProfileContent list={userLikedPosts} username={username} />
                </PrivateRoute>
                <PrivateRoute path='/profile/:username/saved'>
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
