import React from 'react';
import { Link } from 'react-router-dom';
import { FollowButton } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../../constants/utilConstants';

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

  const openFollowingModal = async (listType, countUsers) => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        modalType: 'USER_LIST',
        modalProps: {
          userOrPostId: userId,
          listType,
          countUsers,
          users: true,
        },
      },
    });
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
          onClick={() => openFollowingModal('followers', followers.length)}
        >
          <span className='bold'>{followers && followers.length} </span>{' '}
          followers
        </p>
        <p
          onClick={() => openFollowingModal('following', following.length)}
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
