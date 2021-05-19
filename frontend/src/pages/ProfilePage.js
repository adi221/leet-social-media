import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGrid3X3, BsBookmark, BsHeart } from 'react-icons/bs';
import { ErrorPage } from '../pages';
import { Loader } from '../components';
import {
  getUserProfileDetails,
  followUser,
  unfollowUser,
} from '../actions/userActions';

const ProfilePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [listIndex, setListIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const { userInfo } = useSelector(state => state.userLogin);
  const { success: successFollow } = useSelector(state => state.userFollow);
  const { success: successUnfollow } = useSelector(state => state.userUnfollow);

  useEffect(() => {
    dispatch(getUserProfileDetails(id));
  }, [dispatch, id, successFollow, successUnfollow]);

  const { user, loading, error } = useSelector(
    state => state.userDetailsProfile
  );

  const {
    description,
    numFollowers,
    numFollowing,
    numPosts,
    numSavedPosts,
    numLikedPosts,
    following,
    followers,
    userPosts,
    userSavedPosts,
    userLikedPosts,
    profileImage,
    username,
  } = user;

  useEffect(() => {
    if (!followers) return;
    const isUserFollowing = followers.some(
      follower => follower.user === userInfo._id
    );
    setIsFollowing(isUserFollowing);
  }, [userInfo, followers, user]);

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  const allLists = [userPosts, userLikedPosts, userSavedPosts];

  const followHandler = () => {
    isFollowing ? dispatch(unfollowUser(id)) : dispatch(followUser(id));
  };

  const imgHandler = (username, id) => {
    history.push(`/posts/${username}/${id}`);
  };

  return (
    <div className='profile-page page'>
      <div className='page-center'>
        <header className='profile-page-header '>
          <img src={profileImage} alt={username} />
          <section className='profile-page-header-content'>
            <div className='profile-page-header-heading is-flexed'>
              <h1 className='margin-right32'>{username}</h1>
              {userInfo.username !== username ? (
                <button className='button is-primary' onClick={followHandler}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              ) : (
                <Link
                  to='/settings'
                  className='button is-light'
                  onClick={followHandler}
                >
                  Edit Profile
                </Link>
              )}
            </div>
            <div className='profile-page-header-follow is-flexed'>
              <p className='margin-right64'>
                <span className='bold'>{numPosts} </span> posts
              </p>
              <p className='margin-right64'>
                <span className='bold'>{numFollowers} </span> followers
              </p>
              <p>
                <span className='bold'>{numFollowing} </span> following
              </p>
            </div>
            <div className='profile-page-header-description'>{description}</div>
          </section>
        </header>
        <div className='profile-page-btns is-flexed'>
          <button
            className={`margin-right64 is-flexed ${
              listIndex === 0 && 'active-btn'
            }`}
            onClick={() => setListIndex(0)}
          >
            <BsGrid3X3 /> posts
          </button>
          <button
            className={`margin-right64 is-flexed ${
              listIndex === 1 && 'active-btn'
            }`}
            onClick={() => setListIndex(1)}
          >
            <BsHeart /> liked
          </button>
          <button
            className={`is-flexed ${listIndex === 2 && 'active-btn'}`}
            onClick={() => setListIndex(2)}
          >
            <BsBookmark /> saved
          </button>
        </div>
        <main className='grid-profile'>
          {allLists[listIndex] &&
            allLists[listIndex].map(post => {
              const { _id, image, description, username } = post;
              return (
                <img
                  key={_id}
                  src={image}
                  alt={description}
                  onClick={() => imgHandler(username, _id)}
                />
              );
            })}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
