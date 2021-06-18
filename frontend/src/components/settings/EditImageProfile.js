import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/utilActions';

const EditImageProfile = ({ image, username }) => {
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(openModal('EDIT_PROFILE_IMAGE'));
  };

  return (
    <div className='settings-content__header'>
      <img src={image} alt={username} />
      <div className='is-flexed'>
        <h2>{username}</h2>
        <button onClick={openModalHandler}>Change Profile Photo</button>
      </div>
    </div>
  );
};

export default EditImageProfile;
