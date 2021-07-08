import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import { closeModal } from '../../actions/utilActions';

/**
 * Functional react component to show list of users - likes, followers, following
 * @function UserListModal
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component
 */

const UserListModal = props => {
  console.log(props);
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

UserListModal.propTypes = {
  listType: PropTypes.string.isRequired,
  requestType: PropTypes.string.isRequired,
  userOrPostId: PropTypes.string.isRequired,
};

export default UserListModal;
