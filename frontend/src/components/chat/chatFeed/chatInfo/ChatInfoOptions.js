import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  leaveGroupApi,
  hideChatForUserApi,
} from '../../../../services/chatService';

const ChatInfoOptions = ({ chatId, chatType }) => {
  const history = useHistory();
  const { userInfo } = useSelector(state => state.userLogin);

  const leaveGroup = async () => {
    try {
      await leaveGroupApi(chatId, userInfo.token);
      history.push('/direct/inbox');
    } catch (error) {
      console.log(error);
    }
  };

  const hideChatForUser = async () => {
    try {
      await hideChatForUserApi(chatId, userInfo.token);
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

  const deleteConfirmHandler = () => {
    const confirmed = window.confirm('Are you sure you want to delete chat ?');
    if (confirmed) {
      hideChatForUser();
    }
  };

  return (
    <div className='chat-info__options'>
      <button className='red width100' onClick={deleteConfirmHandler}>
        Delete Chat
      </button>
      {chatType === 'group' && (
        <button className='red width100' onClick={leaveConfirmHandler}>
          Leave Group
        </button>
      )}
    </div>
  );
};

export default ChatInfoOptions;
