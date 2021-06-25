import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/utilActions';
import { USER_STATS_FOLLOWING } from '../../constants/userConstants';
import { unfollowUserApi } from '../../services/userService';

const UnfollowUserModal = props => {
  const { userId, username, profileImage } = props;
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const unfollowUser = async () => {
    try {
      const data = await unfollowUserApi(userId, userInfo.token);

      dispatch({ type: USER_STATS_FOLLOWING, payload: data });
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
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
          <button className='red bold' onClick={unfollowUser}>
            Unfollow
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(closeModal())}> Cancel</button>
        </li>
      </ul>
    </>
  );
};

export default UnfollowUserModal;
