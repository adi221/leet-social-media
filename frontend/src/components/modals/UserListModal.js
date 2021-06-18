import React from 'react';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import { closeModal } from '../../actions/utilActions';

const UserListModal = props => {
  const dispatch = useDispatch();

  return (
    <>
      <div className='modal__title'>
        <h2>{props.listType}</h2>
        <button onClick={() => dispatch(closeModal())}>
          <GrClose />
        </button>
      </div>
      <UsersList {...props} />
    </>
  );
};

export default UserListModal;
