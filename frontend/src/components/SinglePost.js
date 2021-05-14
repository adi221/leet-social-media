import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa';
import { Tags, Comments } from '../components';

const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';

const SinglePost = ({ post }) => {
  const {
    _id,
    tags,
    numLikes,
    numComments,
    username,
    user,
    description,
    image,
    likes,
    comments,
    createdAt,
  } = post;
  const [userImage, setUserImage] = useState(defaultImage);
  const [addedComment, setAddedComment] = useState('');

  const getUserImage = async username => {
    const {
      data: { profileImage },
    } = await axios.get(`/api/users/post/${username}`);

    setUserImage(profileImage);
  };

  useEffect(() => {
    getUserImage(username);
  }, [username]);

  return (
    <article className='single-post is-bordered'>
      <header className='single-post-header'>
        <div className='is-flexed '>
          <img src={userImage} alt={username} />
          <Link to={`/profile/${user}`} className='bold underline'>
            {username}
          </Link>
        </div>
        <BsThreeDots className='single-icon' />
      </header>
      <img className='width100' src={image} alt={description} />
      <div className='single-post-btns is-flexed '>
        <div className='is-flexed'>
          <FaRegHeart className='single-icon margin-right16' />
          <FaRegComment className='single-icon' />
        </div>
        <FaRegBookmark className='single-icon' />
      </div>
      <div className='single-post-likes bold'>{numLikes} likes</div>
      <div className='single-post-description'>
        <p>
          <Link
            to={`/profile/${user}`}
            className='bold margin-right16 underline'
          >
            {username}
          </Link>
          {description}
        </p>
      </div>
      {tags.length > 0 && <Tags tags={tags} />}

      <div className='single-post-created-at'>
        {moment(createdAt).fromNow()}
      </div>
      {numComments.length > 0 && <Comments comments={comments} />}
      <div className='single-post-add-comment'>
        <input
          type='text'
          placeholder='Add a comment..'
          value={addedComment}
          onChange={e => setAddedComment(e.target.value)}
        />
        <button className='bold' disabled={addedComment.length === 0}>
          Post
        </button>
      </div>
    </article>
  );
};

export default SinglePost;
