import React from 'react';
import { useSelector } from 'react-redux';
import FeedBottom from './FeedBottom';
import { SinglePost } from '../../components';

const Feed = () => {
  const postsGet = useSelector(state => state.postsGet);
  const { posts, loadedPosts } = postsGet;

  return (
    <div className='feed'>
      {loadedPosts &&
        loadedPosts.map(id => {
          return <SinglePost key={id} uniqueId={id} simple />;
        })}
      {posts.length === 0 && <FeedBottom />}
    </div>
  );
};

export default Feed;
