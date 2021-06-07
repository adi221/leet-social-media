import React, { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import {
  Tags,
  Comments,
  SinglePostForm,
  SinglePostBtns,
  SinglePostSkeleton,
} from '..';
import { SHOW_MODAL } from '../../constants/utilConstants';
import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
} from '../../constants/singlePostConstants';
import { INITIAL_STATE, singlePostReducer } from './singlePostReducer';

const SinglePost = ({ uniqueId, simple = false }) => {
  const [state, dispatch] = useReducer(singlePostReducer, INITIAL_STATE);
  const dispatchRedux = useDispatch();

  const commentRef = useRef(null);

  const getPostData = async id => {
    try {
      dispatch({ type: SINGLE_POST_LOADING });
      const { data } = await axios.get(`/api/posts/${id}`);
      dispatch({ type: SINGLE_POST_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SINGLE_POST_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getPostData(uniqueId);
  }, [uniqueId]);

  const {
    tags,
    description,
    image,
    likes,
    comments,
    createdAt,
    user: userId,
    _id: postId,
  } = state.post;
  const { profileImage, username } = state.author;

  const openLikesModal = () => {
    dispatchRedux({
      type: SHOW_MODAL,
      payload: {
        modalType: 'USER_LIST',
        modalProps: {
          userOrPostId: postId,
          listType: 'likes',
          countUsers: likes.length,
          users: false,
        },
      },
    });
  };

  const openModalHandler = () => {
    dispatchRedux({
      type: SHOW_MODAL,
      payload: {
        modalType: 'SINGLE_POST',
        modalProps: { username, postId, userId, profileImage },
      },
    });
  };

  if (state.loading) return <SinglePostSkeleton simple={simple} />;
  if (state.error) return null;

  return (
    <article className={`single-post ${simple && 'single-post--simple'}`}>
      <header
        className={`single-post__header ${
          simple && 'single-post__header--simple'
        }`}
      >
        <div className='is-flexed '>
          <img src={profileImage} alt={username} />
          <Link to={`/profile/${username}`} className='bold underline'>
            {username}
          </Link>
        </div>
        <BsThreeDots className='single-icon' onClick={openModalHandler} />
      </header>
      <div
        className={`single-post__image ${
          simple && 'single-post__image--simple'
        }`}
      >
        <img src={image} alt={description} />
      </div>
      <div
        className={`single-post__content ${
          simple && 'single-post__content--simple'
        }`}
      >
        <SinglePostBtns
          dispatch={dispatch}
          commentRef={commentRef}
          uniqueId={uniqueId}
          likes={likes}
        />
        <div
          style={{ cursor: `${likes.length > 0 ? 'pointer' : 'auto'}` }}
          className='bold'
          onClick={openLikesModal}
        >
          {likes.length} likes
        </div>
        <div className='single-post__-description'>
          <p>
            <Link to={`/profile/${username}`} className='bold mr-sm underline'>
              {username}
            </Link>
            {description}
          </p>
        </div>
        {tags && tags.length > 0 && <Tags tags={tags} />}
        <Comments
          comments={comments}
          simple={simple}
          username={username}
          postId={postId}
        />
        <div className='single-post__content--created-at'>
          {moment(createdAt).fromNow()}
        </div>
        <SinglePostForm
          dispatch={dispatch}
          uniqueId={uniqueId}
          commentRef={commentRef}
        />
      </div>
    </article>
  );
};

export default SinglePost;
