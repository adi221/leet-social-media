import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorPage } from '../pages';
import { Loader } from '../components';
import { getUserDetails } from '../actions/userActions';

const SettingsPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  console.log(user);
  const {
    description: descriptionCurr,
    email: emailCurr,
    name: nameCurr,
    username: usernameCurr,
    password,
    profileImage,
  } = user;

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //     setUsername(user.username);
  //     setEmail(user.email);
  //     setDescription(user.description);
  //   }
  // }, [user]);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <div className='page'>
      <div className='page-center settings-container'>
        <ul className='settings-list '>
          <li className='settings-list-item-active'>Edit Profile</li>
          <li>Change Password</li>
        </ul>
        <article className='settings-content'>
          <div className='settings-content-header'>
            <img src={profileImage} alt={usernameCurr} />
            <div className='is-flexed'>
              <h2>{usernameCurr}</h2>
              <button>Change Profile Photo</button>
            </div>
          </div>
          <form onSubmit={submitHandler} className='settings-form is-flexed'>
            <div className=' settings-form-control'>
              <label htmlFor='name' className='bold margin-right32'>
                Name
              </label>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className=' settings-form-control'>
              <label htmlFor='name' className='bold margin-right32'>
                Userame
              </label>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className=' settings-form-control'>
              <label htmlFor='name' className='bold margin-right32'>
                Description
              </label>
              <textarea
                type='text'
                placeholder='Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className=' settings-form-control'>
              <label htmlFor='name' className='bold margin-right32'>
                Email
              </label>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className=' settings-form-control'>
              <p></p>
              <button className='button is-primary' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default SettingsPage;
