import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { Tags, Comments, Loader } from '..';
import { ErrorPage } from '../../pages';
import { SHOW_MODAL } from '../../constants/utilConstants';
import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
  SINGLE_POST_AUTHOR_DETAILS_SUCCESS,
} from '../../constants/singlePostConstants';
import { INITIAL_STATE, singlePostReducer } from './singlePostReducer';
import SinglePostBtns from './SinglePostBtns';

const SinglePost = ({ uniqueId }) => {
  const [addedComment, setAddedComment] = useState('');
  const commentRef = useRef(null);

  const [state, dispatch] = useReducer(singlePostReducer, INITIAL_STATE);
  const dispatchRedux = useDispatch();

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
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    userId && getAuthorDetails(userId);
  }, [userId]);

  const commentHandler = async e => {
    e.preventDefault();
    try {
      // setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(
        `/api/posts/comment/${uniqueId}`,
        { comment: addedComment },
        config
      );
    } catch (error) {
      console.log('Hey');
    }
    // setLoading(false);
    setAddedComment('');
  };

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
      <article className='single-post is-bordered'>
        <Loader />
      </article>
    );
  if (state.error) return <ErrorPage />;

  return (
    <article className='single-post is-bordered'>
      <header className='single-post__header'>
        <div className='is-flexed '>
          <img src={profileImage} alt={username} />
          <Link to={`/profile/${userId}`} className='bold underline'>
            {username}
          </Link>
        </div>
        <BsThreeDots className='single-icon' onClick={openModalHandler} />
      </header>
      <img className='width100' src={image} alt={description} />
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
      <div className='single-post__description'>
        <p>
          <Link to={`/profile/${userId}`} className='bold mr-sm underline'>
            {username}
          </Link>
          {description}
        </p>
      </div>
      {tags && tags.length > 0 && <Tags tags={tags} />}
      {comments.length > 0 && <Comments comments={comments} />}
      <div className='single-post__created-at'>
        {moment(createdAt).fromNow()}
      </div>
      <form className='single-post-add-comment' onSubmit={commentHandler}>
        <input
          type='text'
          placeholder='Add a comment..'
          ref={commentRef}
          value={addedComment}
          onChange={e => setAddedComment(e.target.value)}
        />
        <button className='bold' disabled={addedComment.length === 0}>
          Post
        </button>
      </form>
    </article>
  );
};

export default SinglePost;
