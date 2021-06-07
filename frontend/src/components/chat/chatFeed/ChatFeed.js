import React, { useEffect, useReducer } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatFeedInbox from './ChatFeedInbox';
import ChatFeedHeader from './ChatFeedHeader';
import ChatFeedForm from './ChatFeedForm';
import ChatFeedMessages from './ChatFeedMessages';
import Loader from '../../loaders/Loader';
import {
  INITIAL_STATE,
  chatFeedReducer,
  CHAT_FEED_LOADING,
  CHAT_FEED_ERROR,
  CHAT_FEED_GET_SUCCESS,
} from './chatFeedReducer';

const ChatFeed = () => {
  const { pathname } = useLocation();
  const { chatId } = useParams();
  const { userInfo } = useSelector(state => state.userLogin);
  const [state, dispatch] = useReducer(chatFeedReducer, INITIAL_STATE);

  const getChatData = async id => {
    try {
      dispatch({ type: CHAT_FEED_LOADING });
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`/api/chats/${id}`, config);
      dispatch({ type: CHAT_FEED_GET_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CHAT_FEED_ERROR });
    }
  };

  useEffect(() => {
    if (chatId && pathname !== '/direct/inbox') {
      getChatData(chatId);
    }
    // eslint-disable-next-line
  }, [chatId, pathname]);

  if (pathname === '/direct/inbox') return <ChatFeedInbox />;
  if (state.loading) {
    return (
      <div className='chat-feed'>
        <Loader />
      </div>
    );
  }
  console.log(state);

  const { chatPartners, chatType, messages } = state;

  return (
    <div className='chat-feed'>
      <ChatFeedHeader chatPartners={chatPartners} chatType={chatType} />
      <ChatFeedMessages messages={messages} />
      <ChatFeedForm />
    </div>
  );
};

export default ChatFeed;
