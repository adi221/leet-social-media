import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, deleteUser } from '../../actions/userActions';
import EditImageProfile from './EditImageProfile';

const EditProfile = ({ currSettings }) => {
  const { descriptionCurr, nameCurr, usernameCurr, emailCurr, profileImage } =
    currSettings;
  const [name, setName] = useState(nameCurr);
  const [username, setUsername] = useState(usernameCurr);
  const [description, setDescription] = useState(descriptionCurr);
  const [email, setEmail] = useState(emailCurr);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, username, description, email }));
  };

  const deleteHandler = () => {
    let lastConfirmation = window.confirm('Are you sure you want to delete ?');
    if (lastConfirmation) {
      dispatch(deleteUser(userInfo._id));
    }
  };

  return (
    <>
      <EditImageProfile username={usernameCurr} image={profileImage} />
      <form onSubmit={submitHandler} className='settings-form'>
        <div className='settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            Name
          </label>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            Username
          </label>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            Description
          </label>
          <textarea
            type='text'
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <label htmlFor='name' className='bold mr-md'>
            Email
          </label>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className=' settings-form__control'>
          <label></label>
          <div>
            <button className='button is-primary' type='submit'>
              Submit
            </button>
            <button className='button red is-bordered' onClick={deleteHandler}>
              Delete account
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
