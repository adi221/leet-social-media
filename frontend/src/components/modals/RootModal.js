import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProfileImageModal from './EditProfileImageModal';
import SinglePostModal from './SinglePostModal';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const MODAL_COMPONENTS = {
  EDIT_PROFILE_IMAGE: EditProfileImageModal,
  SINGLE_POST: SinglePostModal,
};

const RootModal = () => {
  const { isShow, modalType } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  if (!isShow) return null;

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <>
      <div className='modal is-flexed'>
        <SpecificModal />
      </div>
      <div className='overlay' onClick={closeModal}></div>
    </>
  );
};

export default RootModal;
