import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/utilActions';
import { FollowButton } from '../../components';
import { POST_DELETE_RESET } from '../../constants/postConstants';
import { deletePost, getPosts } from '../../actions/postActions';

/**
 * Functional react component to show SinglePost options
 * @function SinglePostModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const SinglePostModal = props => {
  const { postId, username, userId, profileImage } = props;
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const { success: successDelete } = useSelector(state => state.postDelete);

  const deleteHandler = () => {
    dispatch(deletePost(postId, userId));
  };

  useEffect(() => {
    if (successDelete) {
      dispatch(getPosts());
      dispatch(closeModal());
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
        <button onClick={() => dispatch(closeModal())}> Cancel</button>
      </li>
    </ul>
  );
};

SinglePostModal.propTypes = {
  username: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};

export default SinglePostModal;
