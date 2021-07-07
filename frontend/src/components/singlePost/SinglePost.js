import React, { useEffect, useRef, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import ErrorPage from '../../pages/ErrorPage';
import {
  Tags,
  Comments,
  SinglePostForm,
  SinglePostBtns,
  SinglePostSkeleton,
} from '..';
import { openModal } from '../../actions/utilActions';
import {
  SINGLE_POST_LOADING,
  SINGLE_POST_ERROR,
  SINGLE_POST_GET_SUCCESS,
} from '../../constants/singlePostConstants';
import { INITIAL_STATE, singlePostReducer } from './singlePostReducer';
import { getSinglePostApi } from '../../services/postService';

const SinglePost = ({ uniqueId, simple = false }) => {
  const [state, dispatch] = useReducer(singlePostReducer, INITIAL_STATE);
  const dispatchRedux = useDispatch();

  const commentRef = useRef(null);

  const getPostData = async id => {
    try {
      dispatch({ type: SINGLE_POST_LOADING });
      const data = await getSinglePostApi(id);

      dispatch({ type: SINGLE_POST_GET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SINGLE_POST_ERROR,
      });
    }
  };

  useEffect(() => {
    getPostData(uniqueId);
  }, [uniqueId]);

  if (state.loading) return <SinglePostSkeleton simple={simple} />;
  if (state.error) {
    return simple ? null : <ErrorPage />;
  }

  const {
    tags,
    description,
    image,
    likes,
    comments,
    createdAt,
    commentCount,
    user: userId,
    _id: postId,
  } = state.post;
  const { profileImage, username } = state.author;

  const openLikesModal = () => {
    dispatchRedux(
      openModal('USER_LIST', {
        userOrPostId: uniqueId,
        requestType: 'POST_LIKES_USERS',
        listType: 'Likes',
      })
    );
  };

  const openModalHandler = () => {
    dispatchRedux(
      openModal('SINGLE_POST', { username, postId, userId, profileImage })
    );
  };

  return (
    <article
      className={`single-post ${simple && 'single-post--simple'}`}
      data-test='component-single-post'
    >
      <header
        className={`single-post__header ${
          simple && 'single-post__header--simple'
        }`}
      >
        <div className='is-flexed '>
          <img src={profileImage} alt={username} />
          <Link to={`/profile/${username}`} className='bold underline'>
            {username}
          </Link>
        </div>
        <BsThreeDots className='single-icon' onClick={openModalHandler} />
      </header>
      <div
        className={`single-post__image ${
          simple && 'single-post__image--simple'
        }`}
      >
        <img src={image} alt={description} />
      </div>
      <div
        className={`single-post__content ${
          simple && 'single-post__content--simple'
        }`}
      >
        <SinglePostBtns
          dispatch={dispatch}
          commentRef={commentRef}
          uniqueId={uniqueId}
          likes={likes}
        />
        <div
          style={{ cursor: `${likes.length > 0 ? 'pointer' : 'auto'}` }}
          className='bold'
          onClick={openLikesModal}
        >
          {likes.length} likes
        </div>
        {simple && (
          <div>
            <p>
              <Link
                to={`/profile/${username}`}
                className='bold mr-sm underline'
              >
                {username}
              </Link>
              {description}
            </p>
          </div>
        )}
        {simple && tags.length > 0 && <Tags tags={tags} />}
        <Comments
          comments={comments}
          simple={simple}
          username={username}
          postId={postId}
          commentCount={commentCount}
          dispatch={dispatch}
          loadingAdditional={state.loadingAdditionalComments}
          description={{
            _id: userId,
            author: state.author,
            comment: description,
            createdAt,
          }}
        />
        <div className='single-post__content--created-at'>
          {moment(createdAt).fromNow()}
        </div>
        <SinglePostForm
          dispatch={dispatch}
          uniqueId={uniqueId}
          commentRef={commentRef}
          replying={state.replying}
          inputLoading={state.inputLoading}
        />
      </div>
    </article>
  );
};

SinglePost.propTypes = {
  uniqueId: PropTypes.string.isRequired,
  simple: PropTypes.bool,
};

export default SinglePost;
