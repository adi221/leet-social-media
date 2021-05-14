import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';

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

  const getUserImage = async username => {
    const { profileImage } = await axios.get(`/api/users/post/${username}`);
    setUserImage(profileImage);
  };

  useEffect(() => {
    getUserImage();
  }, [username]);

  return (
    <article className='single-post is-bordered'>
      <header className='single-post-header'>
        <div className='is-flexed'>
          <img src={userImage} alt={username} />
          <Link to={`/profile/${user}`} className='bold'>
            {username}
          </Link>
        </div>
        <button>
          <BsThreeDots />
        </button>
      </header>
      <img className='width100' src={image} alt={description} />
    </article>
  );
};

export default SinglePost;
