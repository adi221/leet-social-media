import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { USER_STATS_FOLLOWING } from '../../constants/userConstants';

const UnfollowUserModal = props => {
  const { userId, username, profileImage } = props;
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const unfollowUser = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/users/unfollow/${userId}`,
        {},
        config
      );
      dispatch({ type: USER_STATS_FOLLOWING, payload: data });
      dispatch({ type: CLOSE_MODAL });
    } catch (error) {
      console.log(error);
    }
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
          <button className='red bold' onClick={unfollowUser}>
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
