import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostMessageCard from './PostMessageCard';

const SingleChatMessage = ({
  fromUser,
  message,
  messageType,
  post: postId,
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

  const addUsernameOrNot = () => {
    if (userInfo._id === fromUser || chatType === 'dual') return false;
    if (index === 0) return true;
    const prevMessage = messages[index - 1];

    if (prevMessage.fromUser !== fromUser) {
      return true;
    } else {
      return false;
    }
  };

  const determineUsernameDetails = () => {
    let ownerUsername;
    if (chatType === 'dual') {
      ownerUsername = partners[0].username;
    } else {
      let user = partners.find(partner => partner._id === fromUser);
      ownerUsername = user.username;
    }

    return (
      <p className='chat-feed__messages--message-username'>{ownerUsername}</p>
    );
  };

  const imageHandler = username => {
    history.push(`/profile/${username}`);
  };

  return (
    <div
      className={`chat-feed__messages--message ${determineMessageOwner()} ${
        addUsernameOrNot() && 'mt-sm'
      }`}
    >
      {addThumbnailOrNot() && determineThumbnailDetails()}
      {addUsernameOrNot() && determineUsernameDetails()}
      {messageType === 'post' ? (
        <PostMessageCard postId={postId} />
      ) : (
        <p className='chat-feed__messages--message-content'>{message}</p>
      )}
    </div>
  );
};

export default SingleChatMessage;
