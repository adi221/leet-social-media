import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../actions/userActions';

const EditImageProfile = ({ image, username }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  return (
    <div className='settings-content-header'>
      <img src={image} alt={username} />
      <div className='is-flexed'>
        <h2>{username}</h2>
        <button onClick={() => setIsModalShow(true)}>
          Change Profile Photo
        </button>
      </div>
      {isModalShow && (
        <>
          <div className='modal is-flexed'>
            <h2>Change Profile Photo</h2>
            <ul>
              <li>Upload Photo</li>
              <li>Remove Current Photo</li>
              <li>Cancel</li>
            </ul>
          </div>
          <div className='overlay' onClick={() => setIsModalShow(false)}></div>
        </>
      )}
    </div>
  );
};

export default EditImageProfile;
