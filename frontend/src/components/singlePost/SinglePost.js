import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
} from 'react-icons/fa';
import { Tags, Comments, Loader } from '..';
import { ErrorPage } from '../../pages';

const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

const SinglePost = ({ uniqueId }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [successAction, setSuccessAction] = useState(false);
  const [userImage, setUserImage] = useState(defaultImage);
  const [isLiked, setIsLiked] = useState(false);
  const [addedComment, setAddedComment] = useState('');
  const commentRef = useRef(null);

  const getUserData = async id => {
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

  const getUserImage = async username => {
    const {
      data: { profileImage },
    } = await axios.get(`/api/users/post/${username}`);

    setUserImage(profileImage);
  };

  useEffect(() => {
    getUserData(uniqueId);
    if (successAction) {
      setSuccessAction(false);
    }
  }, [uniqueId, successAction]);

  const {
    tags,
    numLikes,
    numComments,
    username,
    description,
    image,
    likes,
    comments,
    createdAt,
  } = post;

  useEffect(() => {
    getUserImage(username);
  }, [username]);

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    const likedOrNot =
      numLikes > 0 ? likes.some(like => like.user === userInfo._id) : 0;
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
      setError(true);
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
      setError(true);
    }
    setLoading(false);
    setAddedComment('');
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
          <img src={userImage} alt={username} />
          <Link to={`/profile/${username}`} className='bold underline'>
            {username}
          </Link>
        </div>
        <BsThreeDots className='single-icon' />
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
        <FaRegBookmark className='single-icon' />
      </div>
      <div className='single-post-likes bold'>{numLikes} likes</div>
      <div className='single-post-description'>
        <p>
          <Link
            to={`/profile/${username}`}
            className='bold margin-right16 underline'
          >
            {username}
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
