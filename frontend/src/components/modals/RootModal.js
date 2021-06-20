import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProfileImageModal from './EditProfileImageModal';
import SinglePostModal from './SinglePostModal';
import UserListModal from './UserListModal';
import UnfollowUserModal from './UnfollowUserModal';
import NewMessageModal from './NewMessageModal';
import AddUserGroupModal from './AddUserGroupModal';
import SharePostModal from './SharePostModal';
import UploadPostModal from './UploadPostModal';
import { closeModal } from '../../actions/utilActions';
import { RESET_CHAT_PARTNERS } from '../../constants/chatConstants';
import { RESET_POST_RECEIVERS } from '../../constants/postConstants';

const MODAL_COMPONENTS = {
  EDIT_PROFILE_IMAGE: EditProfileImageModal,
  SINGLE_POST: SinglePostModal,
  USER_LIST: UserListModal,
  UNFOLLOW_USER: UnfollowUserModal,
  NEW_MESSAGE: NewMessageModal,
  ADD_USER_GROUP: AddUserGroupModal,
  SHARE_POST: SharePostModal,
  UPLOAD_POST: UploadPostModal,
};

const RootModal = () => {
  const { isShow, modalType, modalProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  if (!isShow) return null;

  const closeModalHandler = e => {
    if (e.target.classList.contains('overlay')) {
      dispatch(closeModal());
      // For NewMessageModal
      dispatch({ type: RESET_CHAT_PARTNERS });
      // For SharePostModal
      dispatch({ type: RESET_POST_RECEIVERS });
    }
  };

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <div className='overlay' onClick={closeModalHandler}>
      <div className='modal is-flexed'>
        <SpecificModal {...modalProps} />
      </div>
    </div>
  );
};

export default RootModal;
