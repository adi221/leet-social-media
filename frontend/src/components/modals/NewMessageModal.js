import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { createChat } from '../../actions/chatActions';

const NewMessageModal = props => {
  const dispatch = useDispatch();
  const { partnerUsersId } = useSelector(state => state.createChat);

  const createNewChatHandler = () => {
    dispatch(createChat());
  };

  return (
    <>
      <div className='modal__new-message--title'>
        <button onClick={() => dispatch({ type: CLOSE_MODAL })}>
          <GrClose />
        </button>
        <h3>New Message</h3>
        <button
          onClick={createNewChatHandler}
          className='modal__new-message--title-next'
          disabled={partnerUsersId && partnerUsersId.length === 0}
        >
          Next
        </button>
      </div>
      <UsersList {...props} />
    </>
  );
};

export default NewMessageModal;
