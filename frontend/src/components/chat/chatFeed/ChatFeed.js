import React, { useEffect, useReducer } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import ChatFeedInbox from './ChatFeedInbox';
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
  const [state, dispatch] = useReducer(chatFeedReducer, INITIAL_STATE);

  const getChatData = async id => {
    try {
      dispatch({ type: CHAT_FEED_LOADING });
      const { data } = await axios.get(`/api/chats/${id}`);
      dispatch({ type: CHAT_FEED_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CHAT_FEED_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (chatId && pathname !== '/direct/inbox') {
      getChatData(chatId);
    }
  }, [chatId, pathname]);

  if (pathname === '/direct/inbox') return <ChatFeedInbox />;

  return <div className='chat-feed'>Chat Feed</div>;
};

export default ChatFeed;
