import React, { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import {
  Tags,
  Comments,
  SkeletonLoader,
  SinglePostForm,
  SinglePostBtns,
} from '..';
import { SHOW_MODAL } from '../../constants/utilConstants';
import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_AUTHOR_DETAILS_SUCCESS,
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

  const getAuthorDetails = async id => {
    const {
      data: { profileImage, username },
    } = await axios.get(`/api/users/post/${id}`);
    dispatch({
      type: SINGLE_POST_AUTHOR_DETAILS_SUCCESS,
      payload: { profileImage, username },
    });
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

  useEffect(() => {
    userId && getAuthorDetails(userId);
  }, [userId]);

  const openLikesModal = async () => {
    if (likes.length === 0) return;
    const usersList = [];

    for (const likeUser of likes) {
      const { data: likeUserData } = await axios.get(
        `/api/users/post/${likeUser.user}`
      );
      if (likeUserData) {
        usersList.push(likeUserData);
      }
    }

    dispatchRedux({
      type: SHOW_MODAL,
      payload: {
        modalType: 'USER_LIST',
        modalProps: { usersList, title: 'Likes' },
      },
    });
  };

  const openModalHandler = () => {
    dispatchRedux({
      type: SHOW_MODAL,
      payload: {
        modalType: 'SINGLE_POST',
        modalProps: { username, postId, userId },
      },
    });
  };

  if (state.loading)
    return (
      <article className='single-post'>
        <header
          className={`single-post__header ${
            simple && 'single-post__header--simple'
          }`}
        >
          <SkeletonLoader style={{ height: '4rem', width: '4rem' }} />
        </header>
        <div
          className={`single-post__image ${
            simple && 'single-post__image--simple'
          }`}
        >
          <SkeletonLoader animated />
        </div>
        <div
          className={`single-post__content ${
            simple && 'single-post__content--simple'
          }`}
        >
          <SkeletonLoader animated />
        </div>
      </article>
    );
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
          <Link to={`/profile/${userId}`} className='bold underline'>
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
            <Link to={`/profile/${userId}`} className='bold mr-sm underline'>
              {username}
            </Link>
            {description}
          </p>
        </div>
        {tags && tags.length > 0 && <Tags tags={tags} />}
        <Comments comments={comments} simple={simple} />
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
