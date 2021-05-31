import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unfollowUser } from '../../actions/userActions';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { USER_UNFOLLOW_RESET } from '../../constants/userConstants';

const UnfollowUserModal = props => {
  const { userId, username, profileImage } = props;
  const dispatch = useDispatch();

  const { success: successUnfollow } = useSelector(state => state.userUnfollow);

  useEffect(() => {
    if (successUnfollow) {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
  }, [successUnfollow, dispatch]);

  const unfollowHandler = () => {
    dispatch(unfollowUser(userId));
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <div className='modal__user-details'>
        <img
          src={profileImage}
          alt={username}
          className='modal__user-details--image'
        />
        <p>Unfollow @{username}? </p>
      </div>
      <ul>
        <li>
          <button className='red bold' onClick={unfollowHandler}>
            Unfollow
          </button>
        </li>
        <li>
          <button onClick={closeModal}> Cancel</button>
        </li>
      </ul>
    </>
  );
};

export default UnfollowUserModal;
