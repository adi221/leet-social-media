import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../actions/utilActions';

const ChatInfoMembers = ({ partners, chatId, chatType }) => {
  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();

  const openAddUserGroupModal = () => {
    dispatch(
      openModal('ADD_USER_GROUP', {
        chatId,
        userOrPostId: userInfo._id,
        requestType: 'USER_FOLLOWING',
        checkButton: true,
      })
    );
  };

  const renderUserCard = user => {
    const { _id, name, username, profileImage } = user;
    return (
      <Link
        to={`/profile/${username}`}
        className='chat-info__members--partner '
        key={_id}
      >
        <img src={profileImage} alt={username} />
        <div>
          <p className='bold'>{username}</p>
          <p className='light-grey'>{name}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className='chat-info__members'>
      <div className='chat-info__members--header'>
        <h4>Members</h4>
        {chatType === 'group' && (
          <button
            className='chat-info__members--header-add bold'
            onClick={openAddUserGroupModal}
          >
            Add People
          </button>
        )}
      </div>
      <div>
        {chatType === 'group' &&
          renderUserCard({
            _id: userInfo._id,
            name: userInfo.name,
            username: userInfo.username,
            profileImage: userInfo.profileImage,
          })}
        {partners.map(partner => {
          return renderUserCard(partner);
        })}
      </div>
    </div>
  );
};

export default ChatInfoMembers;
