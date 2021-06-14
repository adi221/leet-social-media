import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatInfoOptions = ({ chatId, chatType }) => {
  const history = useHistory();
  const { userInfo } = useSelector(state => state.userLogin);

  const leaveGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(`/api/chats/leave/${chatId}`, {}, config);
      history.push('/direct/inbox');
    } catch (error) {
      console.log(error);
    }
  };

  const leaveConfirmHandler = () => {
    const confirmed = window.confirm('Are you sure you want to leave ?');
    if (confirmed) {
      leaveGroup();
    }
  };

  return (
    <div className='chat-info__options'>
      <button className='red width100'>Delete Chat</button>
      {chatType === 'group' && (
        <button className='red width100' onClick={leaveConfirmHandler}>
          Leave Group
        </button>
      )}
    </div>
  );
};

export default ChatInfoOptions;
