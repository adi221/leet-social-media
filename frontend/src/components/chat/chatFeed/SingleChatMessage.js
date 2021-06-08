import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SingleChatMessage = ({
  fromUser,
  message,
  index,
  messages,
  partners,
  chatType,
}) => {
  const { userInfo } = useSelector(state => state.userLogin);
  const history = useHistory();

  const determineMessageOwner = () => {
    const isOwner = userInfo._id === fromUser;
    return isOwner
      ? 'chat-feed__messages--message-owner'
      : 'chat-feed__messages--message-other-person';
  };

  const addThumbnailOrNot = () => {
    if (userInfo._id === fromUser) return false;
    if (index === messages.length - 1) return true;
    const nextMessage = messages[index + 1];

    if (nextMessage.fromUser !== fromUser) {
      return true;
    } else {
      return false;
    }
  };

  const determineThumbnailDetails = () => {
    let ownerImg, ownerUsername;
    if (chatType === 'dual') {
      ownerImg = partners[0].profileImage;
      ownerUsername = partners[0].username;
    } else {
      let user = partners.find(partner => partner._id === fromUser);
      ownerImg = user.profileImage;
      ownerUsername = user.username;
    }

    return (
      <img
        className='chat-feed__messages--message-img '
        src={ownerImg}
        alt={ownerUsername}
        onClick={() => imageHandler(ownerUsername)}
      />
    );
  };

  const imageHandler = username => {
    history.push(`/profile/${username}`);
  };

  return (
    <div className={`chat-feed__messages--message ${determineMessageOwner()}`}>
      {addThumbnailOrNot() && determineThumbnailDetails()}
      <p>{message}</p>
    </div>
  );
};

export default SingleChatMessage;
