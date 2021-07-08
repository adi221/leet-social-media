import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/utilActions';
import { USER_STATS_FOLLOWING } from '../../constants/userConstants';
import { unfollowUserApi } from '../../services/userService';

/**
 * Functional react component where user get to choose if he wants to unfollow a specific user
 * @function UnfollowUserModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

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

UnfollowUserModal.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};

export default UnfollowUserModal;
