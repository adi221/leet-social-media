import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorPage } from '../pages';
import { Loader, EditProfile, EditImageProfile } from '../components';
import { getUserDetails } from '../actions/userActions';

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

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

  return (
    <div className='page'>
      <div className='page-center settings-container'>
        <ul className='settings-list '>
          <li className='settings-list-item-active'>Edit Profile</li>
          <li>Change Password</li>
        </ul>
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
      </div>
    </div>
  );
};

export default SettingsPage;
