import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/utilActions';

/**
 * Functional react component for options of a single comment / reply
 * @function CommentOptionsModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const CommentOptionsModal = ({ type, deleteHandler }) => {
  const dispatch = useDispatch();

  return (
    <ul>
      <li>
        <button className='red bold' onClick={deleteHandler}>
          Delete {type === 'deleteComment' ? 'Comment' : 'Reply'}
        </button>
      </li>
      <li>
        <button onClick={() => dispatch(closeModal())}> Cancel</button>
      </li>
    </ul>
  );
};

CommentOptionsModal.propTypes = {
  type: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentOptionsModal;
