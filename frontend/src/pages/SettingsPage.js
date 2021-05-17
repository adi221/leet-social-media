import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components';
import { getUserDetails } from '../actions/userActions';

const SettingsPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  if (loading) return <Loader />;
  console.log(user);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className='page'>
      <div className='page-center is-flexed'>
        <ul className='settings-sidebar'>
          <li>Edit Profile</li>
          <li>Change Password</li>
        </ul>
        <article className='settings-content'>
          <div className='settings-content-header'></div>
          <form onSubmit={submitHandler} className='settings-form'>
            <div className='is-flexed'>
              <label htmlFor='name' className='bold settings-form-label'>
                Name
              </label>
              <input
                className='form-control is-bordered'
                type='text'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='is-flexed'>
              <label htmlFor='name' className='bold settings-form-label'>
                Name
              </label>
              <input
                className='form-control is-bordered'
                type='text'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='is-flexed'>
              <label htmlFor='name' className='bold settings-form-label'>
                Name
              </label>
              <input
                className='form-control is-bordered'
                type='text'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default SettingsPage;
