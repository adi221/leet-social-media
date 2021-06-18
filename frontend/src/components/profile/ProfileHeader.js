import React from 'react';
import { Link } from 'react-router-dom';
import { FollowButton } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../actions/utilActions';

const ProfileHeader = ({ user }) => {
  const {
    description,
    following,
    followers,
    userPosts,
    profileImage,
    username,
    _id: userId,
  } = user;

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const openFollowingModal = listType => {
    dispatch(
      openModal('USER_LIST', { userOrPostId: userId, listType, users: true })
    );
  };

  const renderFollowDiv = () => {
    return (
      <>
        <p className='mr-lg'>
          <span className='bold'>{userPosts && userPosts.length} </span> posts
        </p>
        <p
          className='mr-lg'
          style={{
            cursor: `${followers && followers.length > 0 ? 'pointer' : 'auto'}`,
          }}
          onClick={() => openFollowingModal('followers')}
        >
          <span className='bold'>{followers && followers.length} </span>{' '}
          followers
        </p>
        <p
          onClick={() => openFollowingModal('following')}
          style={{
            cursor: `${following && following.length > 0 ? 'pointer' : 'auto'}`,
          }}
        >
          <span className='bold'>{following && following.length} </span>{' '}
          following
        </p>
      </>
    );
  };

  return (
    <header className='profile-page__header'>
      <img src={profileImage} alt={username} />
      <section className='profile-page__header--content'>
        <div className='profile-page__header--heading is-flexed'>
          <h1 className='mr-md'>{username}</h1>
          {userInfo._id !== userId ? (
            <FollowButton
              userId={userId}
              username={username}
              profileImage={profileImage}
            />
          ) : (
            <Link to='/settings/edit' className='button is-light'>
              Edit Profile
            </Link>
          )}
        </div>
        <div className='profile-page__header--content-follow is-flexed'>
          {renderFollowDiv()}
        </div>
        <div className='profile-page__header--description'>{description}</div>
      </section>
      <div className='profile-page__header--mobile-follow is-flexed'>
        {renderFollowDiv()}
      </div>
    </header>
  );
};

export default ProfileHeader;
