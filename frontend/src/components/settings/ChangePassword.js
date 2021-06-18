import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../../components';
import { USER_UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { updateUserPassword } from '../../actions/userActions';
import { showAlert } from '../../actions/utilActions';
import SettingsHeader from './SettingsHeader';

const ChangePassword = ({ currSettings }) => {
  const { usernameCurr, profileImage } = currSettings;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    state => state.userUpdatePassword
  );

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PASSWORD_RESET });
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
      }, 2500);
    } else if (error) {
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PASSWORD_RESET });
      }, 2500);
    }
  }, [error, success, dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    if (!newPassword || !newPasswordConfirm || !oldPassword) {
      window.alert('Please fill all the fields');
    } else if (newPassword !== newPasswordConfirm) {
      window.alert('New password and password confirm do not match');
    } else {
      dispatch(updateUserPassword({ oldPassword, newPassword }));
    }
  };

  return (
    <>
      <SettingsHeader username={usernameCurr} image={profileImage} />
      <form onSubmit={submitHandler} className='settings-form is-flexed'>
        <div className=' settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            Old Password
          </label>
          <input
            type='password'
            placeholder='Old Password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            New Password
          </label>
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            Confirm New Password
          </label>
          <input
            type='password'
            placeholder='Confirm New Password'
            value={newPasswordConfirm}
            onChange={e => setNewPasswordConfirm(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <p></p>
          <button className='button is-primary' type='submit'>
            Submit
          </button>
        </div>
        {loading && <Message type='info' text='Loading...' />}
        {success && (
          <Message type='success' text='Password successfully changed' />
        )}
        {error && <Message type='danger' text={error} />}
      </form>
    </>
  );
};

export default ChangePassword;
