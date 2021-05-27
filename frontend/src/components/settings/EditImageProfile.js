import React from 'react';
import { useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../../constants/utilConstants';

const EditImageProfile = ({ image, username }) => {
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: { modalType: 'EDIT_PROFILE_IMAGE', modalProps: {} },
    });
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
