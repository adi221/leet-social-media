import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/userActions';

const SingleUserSuggestion = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  const { following } = useSelector(state => state.userStats);

  useEffect(() => {
    const isUserFollowing =
      following &&
      following.some(followedUser => followedUser.user === user._id);
    setIsFollowing(isUserFollowing);
  }, [user, following]);

  const followHandler = () => {
    isFollowing
      ? dispatch(unfollowUser(user._id))
      : dispatch(followUser(user._id));
  };

  return (
    <div key={user._id} className='home-sidebar__suggestions-suggestion'>
      <div className='home-sidebar__suggestions-suggestion__info'>
        <img src={user.profileImage} alt={user.username} className='mr-sm' />
        <div>
          <Link to={`/profile/${user._id}`} className='bold underline'>
            {user.username}
          </Link>
          <p>{user.name}</p>
        </div>
      </div>
      <button
        className={`button bold ${isFollowing ? 'grey' : 'blue'}`}
        onClick={followHandler}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default SingleUserSuggestion;
