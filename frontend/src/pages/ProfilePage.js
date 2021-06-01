import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link, NavLink, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BsGrid3X3, BsBookmark, BsHeart } from 'react-icons/bs';
import { ErrorPage } from '../pages';
import { Loader, FollowButton } from '../components';
import { SHOW_MODAL } from '../constants/utilConstants';
import { getUserProfileDetails } from '../actions/userActions';

const ProfilePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [listIndex, setListIndex] = useState(0);

  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    dispatch(getUserProfileDetails(id));
  }, [dispatch, id]);

  const { user, loading, error } = useSelector(
    state => state.userDetailsProfile
  );

  const {
    description,
    following,
    followers,
    userPosts,
    userSavedPosts,
    userLikedPosts,
    profileImage,
    username,
  } = user;

  if (loading) return <Loader />;
  if (error) return <ErrorPage />;

  const allLists = [userPosts, userLikedPosts, userSavedPosts];

  const imgHandler = (username, id) => {
    history.push(`/posts/${username}/${id}`);
  };

  const openFollowingModal = async (listType, countUsers) => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        modalType: 'USER_LIST',
        modalProps: {
          userOrPostId: id,
          listType,
          countUsers,
          users: true,
        },
      },
    });
  };

  return (
    <div className='profile-page page'>
      <div className='page-center'>
        <header className='profile-page__header '>
          <img src={profileImage} alt={username} />
          <section className='profile-page__header--content'>
            <div className='profile-page__header--heading is-flexed'>
              <h1 className='mr-md'>{username}</h1>
              {userInfo.username !== username ? (
                <FollowButton
                  userId={id}
                  username={username}
                  profileImage={profileImage}
                />
              ) : (
                <Link to='/settings/edit' className='button is-light'>
                  Edit Profile
                </Link>
              )}
            </div>
            <div className='profile-page__header--follow is-flexed'>
              <p className='mr-lg'>
                <span className='bold'>{userPosts && userPosts.length} </span>{' '}
                posts
              </p>
              <p
                className='mr-lg'
                style={{
                  cursor: `${
                    followers && followers.length > 0 ? 'pointer' : 'auto'
                  }`,
                }}
                onClick={() =>
                  openFollowingModal('followers', followers.length)
                }
              >
                <span className='bold'>{followers && followers.length} </span>{' '}
                followers
              </p>
              <p
                onClick={() =>
                  openFollowingModal('following', following.length)
                }
                style={{
                  cursor: `${
                    following && following.length > 0 ? 'pointer' : 'auto'
                  }`,
                }}
              >
                <span className='bold'>{following && following.length} </span>{' '}
                following
              </p>
            </div>
            <div className='profile-page__header--description'>
              {description}
            </div>
          </section>
        </header>
        <div className='profile-page__btns is-flexed'>
          <button
            className={`mr-lg is-flexed ${listIndex === 0 && 'active-btn'}`}
            onClick={() => setListIndex(0)}
          >
            <BsGrid3X3 /> posts
          </button>
          <button
            className={`mr-lg is-flexed ${listIndex === 1 && 'active-btn'}`}
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
