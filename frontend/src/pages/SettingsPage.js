import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorPage } from '../pages';
import {
  Loader,
  EditProfile,
  EditImageProfile,
  ChangePassword,
  SettingsHeader,
} from '../components';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { getUserDetails } from '../actions/userActions';

const SettingsPage = () => {
  const [activeItem, setActiveItem] = useState(0);

  const dispatch = useDispatch();
  const { success } = useSelector(state => state.userUpdateProfile);

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
    password,
    profileImage,
  } = user;

  const content =
    activeItem === 0 ? (
      <article className='settings-content'>
        <EditImageProfile username={usernameCurr} image={profileImage} />
        <EditProfile
          currentSettings={{
            descriptionCurr,
            nameCurr,
            usernameCurr,
            emailCurr,
          }}
        />
      </article>
    ) : (
      <article className='settings-content'>
        <SettingsHeader username={usernameCurr} image={profileImage} />
        <ChangePassword currPassword={password} />
      </article>
    );

  return (
    <div className='page'>
      <div className='page-center settings-container'>
        <ul className='settings-list '>
          <li
            className={activeItem === 0 ? 'settings-list-item-active' : ''}
            onClick={() => setActiveItem(0)}
          >
            Edit Profile
          </li>
          <li
            className={activeItem === 1 ? 'settings-list-item-active' : ''}
            onClick={() => setActiveItem(1)}
          >
            Change Password
          </li>
        </ul>
        {content}
      </div>
    </div>
  );
};

export default SettingsPage;
