import React from 'react';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const NewMessageModal = props => {
  const dispatch = useDispatch();
  const createNewChatHandler = () => {};

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
        >
          Next
        </button>
      </div>
      <UsersList {...props} />
    </>
  );
};

export default NewMessageModal;
