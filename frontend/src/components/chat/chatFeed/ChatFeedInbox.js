import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { openModal } from '../../../actions/utilActions';

const ChatFeedInbox = () => {
  const { userInfo } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();

  const openMessageModalHandler = () => {
    dispatch(
      openModal('NEW_MESSAGE', {
        userOrPostId: userInfo._id,
        listType: 'following',
        users: true,
        checkButton: true,
      })
    );
  };

  return (
    <div className='chat-feed-inbox'>
      <div className='chat-feed-inbox__content'>
        <div className='chat-feed-inbox__content--icon is-flexed'>
          <IoPaperPlaneOutline />
        </div>
        <h1>Your Messages</h1>
        <p className='bold'>
          Send private photos and messages to a friend or group.
        </p>
        <button onClick={openMessageModalHandler} className='button is-primary'>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatFeedInbox;
