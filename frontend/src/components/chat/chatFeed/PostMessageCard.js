import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SkeletonLoader from '../../loaders/SkeletonLoader';

const PostMessageCard = ({ postId }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const history = useHistory();

  const getPostDetails = async id => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/posts/${id}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPostDetails(postId);
  }, [postId]);

  const { author, image, description } = post;

  return (
    <div className='chat-feed__messages--message-post'>
      {loading ? (
        <SkeletonLoader style={{ height: '2.4rem', width: '16rem' }} />
      ) : (
        <Link
          to={`/posts/${author.username}/${postId}`}
          className='chat-feed__messages--message-post-header is-flexed'
        >
          <img src={author.profileImage} alt={author.username} />
          <p className='bold'>{author.username}</p>
        </Link>
      )}
      {loading ? (
        <SkeletonLoader animated style={{ height: '16rem', width: '16rem' }} />
      ) : (
        <img
          src={image}
          alt='post'
          className='chat-feed__messages--message-post-img'
          onClick={() => history.push(`/posts/${author.username}/${postId}`)}
        />
      )}
      {loading ? (
        <SkeletonLoader style={{ height: '2.4rem', width: '16rem' }} />
      ) : (
        <div className='chat-feed__messages--message-post-body'>
          <p>
            <span className='bold mr-sm'>{author.username}</span>
            {description.substring(0, 30)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostMessageCard;
