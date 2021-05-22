import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { CLOSE_MODAL } from '../../constants/utilConstants';

const UserListModal = ({ usersList, title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userHandler = id => {
    history.push(`/profile/${id}`);
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <div className='modal-title'>
        <h2>{title}</h2>
        <button onClick={() => dispatch({ type: CLOSE_MODAL })}>
          <GrClose />
        </button>
      </div>
      <ul>
        {usersList.map(user => {
          const { name, username, profileImage, _id } = user;
          return (
            <li className='user-modal-item' onClick={() => userHandler(_id)}>
              <img src={profileImage} alt={name} className='margin-right16' />
              <div>
                <p className='bold underline'>{username}</p>
                <p>{name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserListModal;
