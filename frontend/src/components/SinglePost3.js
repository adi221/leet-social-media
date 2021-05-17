import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
} from 'react-icons/fa';
import { Tags, Comments } from '../components';

import { likePost, commentPost } from '../actions/postActions';

const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

const SinglePost = ({ post }) => {
  const {
    _id,
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
  const [userImage, setUserImage] = useState(defaultImage);
  const [addedComment, setAddedComment] = useState('');

  const commentRef = useRef(null);

  // So I can render again without rerendering all the posts
  const [isLiked, setIsLiked] = useState(false);
  // const [totalComments, setTotalComments] = useState(numComments);
  // const [totalLikes, setTotalLikes] = useState(numLikes);
  // const [allLikes, setAllLikes] = useState(likes);
  // const [allComments, setAllComments] = useState(comments);

  const { userInfo } = useSelector(state => state.userLogin);

  const dispatch = useDispatch();

  const getUserImage = async username => {
    const {
      data: { profileImage },
    } = await axios.get(`/api/users/post/${username}`);

    setUserImage(profileImage);
  };

  useEffect(() => {
    const likedOrNot =
      numLikes > 0 ? likes.some(like => like.user === userInfo._id) : 0;
    setIsLiked(likedOrNot);
  }, [likes, userInfo, numLikes]);

  useEffect(() => {
    getUserImage(username);
  }, [username]);

  const likeHandler = () => {
    dispatch(likePost(_id));
  };

  const commentHandler = e => {
    e.preventDefault();
    dispatch(commentPost(_id, addedComment));
    setAddedComment('');
  };

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