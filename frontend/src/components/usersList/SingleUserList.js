import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FollowButton } from '../../components';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const SingleUserList = ({ name, username, profileImage, _id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const userHandler = id => {
    history.push(`/profile/${id}`);
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <li className='modal__users--item' key={_id}>
      <div className='is-flexed' onClick={() => userHandler(_id)}>
        <img src={profileImage} alt={name} className='mr-sm' />
        <div>
          <p className='bold underline'>{username}</p>
          <p>{name}</p>
        </div>
      </div>
      {userInfo._id !== _id && (
        <FollowButton
          userId={_id}
          profileImage={profileImage}
          username={username}
        />
      )}
    </li>
  );
};

export default SingleUserList;
