import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProfileImageModal from './EditProfileImageModal';
import SinglePostModal from './SinglePostModal';
import UserListModal from './UserListModal';
import UnfollowUserModal from './UnfollowUserModal';
import NewMessageModal from './NewMessageModal';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { RESET_CHAT_PARTNERS } from '../../constants/chatConstants';

const MODAL_COMPONENTS = {
  EDIT_PROFILE_IMAGE: EditProfileImageModal,
  SINGLE_POST: SinglePostModal,
  USER_LIST: UserListModal,
  UNFOLLOW_USER: UnfollowUserModal,
  NEW_MESSAGE: NewMessageModal,
};

const RootModal = () => {
  const { isShow, modalType, modalProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  if (!isShow) return null;

  const closeModal = e => {
    if (e.target.classList.contains('overlay')) {
      dispatch({ type: CLOSE_MODAL });
      // For NewMessageModal
      dispatch({ type: RESET_CHAT_PARTNERS });
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
