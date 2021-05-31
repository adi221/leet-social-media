import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProfileImageModal from './EditProfileImageModal';
import SinglePostModal from './SinglePostModal';
import UserListModal from './UserListModal';
import UnfollowUserModal from './UnfollowUserModal';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const MODAL_COMPONENTS = {
  EDIT_PROFILE_IMAGE: EditProfileImageModal,
  SINGLE_POST: SinglePostModal,
  USER_LIST: UserListModal,
  UNFOLLOW_USER: UnfollowUserModal,
};

const RootModal = () => {
  const { isShow, modalType, modalProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  if (!isShow) return null;

  const closeModal = e => {
    if (e.target.classList.contains('overlay')) {
      dispatch({ type: CLOSE_MODAL });
    }
  };

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <div className='overlay' onClick={closeModal}>
      <div className='modal is-flexed'>
        <SpecificModal {...modalProps} />
      </div>
    </div>
  );
};

export default RootModal;
