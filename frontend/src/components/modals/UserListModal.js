import React from 'react';
import { useDispatch } from 'react-redux';
import { UsersList } from '../../components';
import { GrClose } from 'react-icons/gr';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const UserListModal = props => {
  const dispatch = useDispatch();

  return (
    <>
      <div className='modal__title'>
        <h2>{props.listType}</h2>
        <button onClick={() => dispatch({ type: CLOSE_MODAL })}>
          <GrClose />
        </button>
      </div>
      <UsersList {...props} />
    </>
  );
};

export default UserListModal;
