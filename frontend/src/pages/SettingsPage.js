import React, { useEffect } from 'react';
import { NavLink, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorPage } from '../pages';
import {
  Loader,
  EditProfile,
  ChangePassword,
  PrivateRoute,
} from '../components';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { getUserDetails } from '../actions/userActions';

const SettingsPage = () => {
  const history = useHistory();
  const {
    location: { pathname },
  } = useHistory();

  const dispatch = useDispatch();
  const { success } = useSelector(state => state.userUpdateProfile);

  useEffect(() => {
    if (pathname === '/settings') {
      history.push('/settings/edit');
    }
  }, [pathname, history]);

  useEffect(() => {
    dispatch(getUserDetails());
    success && dispatch({ type: USER_UPDATE_PROFILE_RESET });
  }, [dispatch, success]);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  const {
    description: descriptionCurr,
    email: emailCurr,
    name: nameCurr,
    username: usernameCurr,
    profileImage,
  } = user;

  return (
    <div className='page settings-page'>
      <div className='page-center settings-page__container'>
        <ul className='settings-page__container--list '>
          <NavLink
            to='/settings/edit'
            activeClassName='settings-page__container--list-link-active'
            className='settings-page__container--list-link'
          >
            Edit Profile
          </NavLink>
          <NavLink
            to='/settings/password'
            activeClassName='settings-page__container--list-link-active'
            className='settings-page__container--list-link'
          >
            Change Password
          </NavLink>
        </ul>
        <article className='settings-page__container--content'>
          <Switch>
            <PrivateRoute path='/settings/edit'>
              <EditProfile
                currSettings={{
                  descriptionCurr,
                  emailCurr,
                  nameCurr,
                  usernameCurr,
                  profileImage,
                }}
              />
            </PrivateRoute>
            <PrivateRoute path='/settings/password'>
              <ChangePassword
                currSettings={{
                  usernameCurr,
                  profileImage,
                }}
              />
            </PrivateRoute>
          </Switch>
        </article>
      </div>
    </div>
  );
};

export default SettingsPage;
