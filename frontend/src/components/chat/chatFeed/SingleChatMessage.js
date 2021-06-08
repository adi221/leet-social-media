import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SingleChatMessage = ({
  fromUser,
  message,
  index,
  messages,
  thumbnail,
  username,
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

  const imageHandler = () => {
    history.push(`/profile/${username}`);
  };

  return (
    <div className={`chat-feed__messages--message ${determineMessageOwner()}`}>
      {addThumbnailOrNot() && (
        <img
          className='chat-feed__messages--message-img '
          src={thumbnail}
          alt={username}
          onClick={imageHandler}
        />
      )}
      <p>{message}</p>
    </div>
  );
};

export default SingleChatMessage;
