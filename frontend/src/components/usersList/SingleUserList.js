import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckButton from '../../components/buttons/CheckButton';
import FollowButton from '../../components/buttons/FollowButton';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const SingleUserList = ({ name, username, profileImage, _id, checkButton }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const userHandler = id => {
    history.push(`/profile/${id}`);
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <li className='modal__users--item ' key={_id}>
      <div className='is-flexed' onClick={() => userHandler(_id)}>
        <img src={profileImage} alt={name} className='mr-sm' />
        <div>
          <p className='bold'>{username}</p>
          <p>{name}</p>
        </div>
      </div>
      {!checkButton ? (
        userInfo._id !== _id && (
          <FollowButton
            userId={_id}
            profileImage={profileImage}
            username={username}
          />
        )
      ) : (
        <CheckButton userId={_id} />
      )}
    </li>
  );
};

export default SingleUserList;
