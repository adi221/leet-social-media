import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../actions/userActions';

const EditProfile = ({ currentSettings }) => {
  const { descriptionCurr, nameCurr, usernameCurr, emailCurr } =
    currentSettings;
  const [name, setName] = useState(nameCurr);
  const [username, setUsername] = useState(usernameCurr);
  const [description, setDescription] = useState(descriptionCurr);
  const [email, setEmail] = useState(emailCurr);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, username, description, email }));
  };

  return (
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
  );
};

export default EditProfile;
