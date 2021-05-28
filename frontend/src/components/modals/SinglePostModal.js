import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/userActions';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import {
  USER_FOLLOW_RESET,
  USER_UNFOLLOW_RESET,
} from '../../constants/userConstants';
import { POST_DELETE_RESET } from '../../constants/postConstants';
import { deletePost, getPosts } from '../../actions/postActions';

const SinglePostModal = props => {
  const { postId, username, userId } = props;
  const [isFollowing, setIsFollowing] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const { following } = useSelector(state => state.userStats);
  const { success: successFollow } = useSelector(state => state.userFollow);
  const { success: successUnfollow } = useSelector(state => state.userUnfollow);
  const { success: successDelete } = useSelector(state => state.postDelete);

  useEffect(() => {
    if (userInfo._id === userId) return;
    const isUserFollowing = following.some(
      follower => follower.user === userId
    );
    setIsFollowing(isUserFollowing);
  }, [userInfo, userId, following]);

  const followHandler = () => {
    isFollowing ? dispatch(unfollowUser(userId)) : dispatch(followUser(userId));
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const deleteHandler = () => {
    dispatch(deletePost(postId, userId));
  };

  useEffect(() => {
    if (successFollow || successUnfollow) {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: USER_FOLLOW_RESET });
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
  }, [successFollow, successUnfollow, dispatch]);

  useEffect(() => {
    if (successDelete) {
      dispatch(getPosts());
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: POST_DELETE_RESET });
    }
  }, [successDelete, dispatch]);

  return (
    <ul>
      {userInfo._id === userId ? (
        <li>
          <button className='red bold' onClick={deleteHandler}>
            Delete Post
          </button>
        </li>
      ) : (
        <li>
          <button
            className={`bold ${isFollowing ? 'red' : 'green'}`}
            onClick={followHandler}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </li>
      )}
      <li>
        <Link to={`/posts/${username}/${postId}`} className='blue bold'>
          Go To Post
        </Link>
      </li>
      <li>
        <button onClick={closeModal}> Cancel</button>
      </li>
    </ul>
  );
};

export default SinglePostModal;
