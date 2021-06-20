import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/utilActions';
import LoaderSvg from '../loaders/LoaderSvg';
import { GrClose, GrPrevious } from 'react-icons/gr';

const UploadHeader = ({ activeMode, changeMode, uploadPost, loading }) => {
  // activeMode can be either preview or details
  const dispatch = useDispatch();

  return (
    <div className='modal__upload--header'>
      {activeMode === 'preview' ? (
        <button
          onClick={() =>
            (activeMode = 'preview'
              ? dispatch(closeModal())
              : changeMode('preview'))
          }
        >
          <GrClose />
        </button>
      ) : (
        <button onClick={() => changeMode('preview')}>
          <GrPrevious />
        </button>
      )}
      <h3>New Post</h3>
      <button
        className='modal__upload--header-next'
        onClick={() =>
          activeMode === 'preview' ? changeMode('details') : uploadPost()
        }
      >
        {activeMode === 'preview' ? 'Next' : 'Share'}
        {loading && <LoaderSvg />}
      </button>
    </div>
  );
};

export default UploadHeader;
