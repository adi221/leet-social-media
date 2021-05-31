import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { FollowButton } from '../../components';
import { POST_DELETE_RESET } from '../../constants/postConstants';
import { deletePost, getPosts } from '../../actions/postActions';

const SinglePostModal = props => {
  const { postId, username, userId, profileImage } = props;
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const { success: successDelete } = useSelector(state => state.postDelete);

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const deleteHandler = () => {
    dispatch(deletePost(postId, userId));
  };

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
          <FollowButton
            userId={userId}
            username={username}
            colored
            profileImage={profileImage}
            style={{
              backgroundColor: 'transparent',
              fontWeight: 'bold',
            }}
          />
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
