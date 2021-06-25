import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/utilActions';

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

export default CommentOptionsModal;
