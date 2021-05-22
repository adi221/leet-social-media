import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { Tags, Comments, Loader } from '..';
import { ErrorPage } from '../../pages';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';
import { SHOW_MODAL } from '../../constants/utilConstants';

const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

const SinglePost = ({ uniqueId }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [userImage, setUserImage] = useState(defaultImage);
  const [postUsername, setPostUsername] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [addedComment, setAddedComment] = useState('');
  const commentRef = useRef(null);

  const dispatch = useDispatch();
  console.log(post);

  const getPostData = async id => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/posts/${id}`);
      setPost(data);
      console.log(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const getUserImageName = async id => {
    const {
      data: { profileImage, username },
    } = await axios.get(`/api/users/post/${id}`);

    setUserImage(profileImage);
    setPostUsername(username);
  };

  useEffect(() => {
    getPostData(uniqueId);
    if (successAction) {
      setSuccessAction(false);
    }
  }, [uniqueId, successAction]);

  const {
    tags,
    numLikes,
    numComments,
    description,
    image,
    likes,
    comments,
    createdAt,
    user: userId,
    _id: postId,
    username,
  } = post;

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    getUserImageName(userId);
    const savedOrNot =
      userInfo.savedPosts && userInfo.savedPosts.some(p => p.post === uniqueId);
    setIsSaved(savedOrNot);
  }, [userId, uniqueId, userInfo]);

  useEffect(() => {
    const likedOrNot =
      numLikes > 0 ? likes.some(like => like.user === userInfo._id) : false;
    setIsLiked(likedOrNot);
  }, [likes, userInfo, numLikes]);

  const likeHandler = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/posts/like/${uniqueId}`, {}, config);
      setSuccessAction(true);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const commentHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
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
      setSuccessAction(true);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
    setAddedComment('');
  };

  const addToSavedHandler = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/users/save/${uniqueId}`,
        {},
        config
      );
      setSuccessAction(true);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.userInfo });
      localStorage.setItem('userInfoLeet', JSON.stringify(data.userInfo));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
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

    dispatch({
      type: SHOW_MODAL,
      payload: {
        modalType: 'USER_LIST',
        modalProps: { usersList, title: 'Likes' },
      },
    });
  };

  const openModalHandler = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        modalType: 'SINGLE_POST',
        modalProps: { username, postId, userId },
      },
    });
  };

  if (loading)
    return (
      <article className='single-post is-bordered'>
        <Loader />
      </article>
    );
  if (error) return <ErrorPage />;

  return (
    <article className='single-post is-bordered'>
      <header className='single-post-header'>
        <div className='is-flexed '>
          <img src={userImage} alt={postUsername} />
          <Link to={`/profile/${userId}`} className='bold underline'>
            {postUsername}
          </Link>
        </div>
        <BsThreeDots className='single-icon' onClick={openModalHandler} />
      </header>
      <img className='width100' src={image} alt={description} />
      <div className='single-post-btns is-flexed '>
        <div className='is-flexed'>
          {isLiked ? (
            <FaHeart
              onClick={likeHandler}
              className='single-icon margin-right16'
              style={{ fill: 'red' }}
            />
          ) : (
            <FaRegHeart
              onClick={likeHandler}
              className='single-icon margin-right16'
            />
          )}
          <FaRegComment
            onClick={() => commentRef.current.focus()}
            className='single-icon'
          />
        </div>
        {isSaved ? (
          <FaBookmark className='single-icon' onClick={addToSavedHandler} />
        ) : (
          <FaRegBookmark className='single-icon' onClick={addToSavedHandler} />
        )}
      </div>
      <div
        style={{ cursor: `${likes.length > 0 ? 'pointer' : 'auto'}` }}
        className='single-post-likes bold'
        onClick={openLikesModal}
      >
        {numLikes} likes
      </div>
      <div className='single-post-description'>
        <p>
          <Link
            to={`/profile/${userId}`}
            className='bold margin-right16 underline'
          >
            {postUsername}
          </Link>
          {description}
        </p>
      </div>
      {tags && tags.length > 0 && <Tags tags={tags} />}
      {numComments > 0 && <Comments comments={comments} />}
      <div className='single-post-created-at'>
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
