import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FiCamera } from 'react-icons/fi';
import { openModal } from '../../actions/utilActions';

const UploadButton = ({ children = null, style }) => {
  const [file, setFile] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      dispatch(openModal('UPLOAD_POST', { file }));
      fileInputRef.current.value = '';
    }
  }, [file, dispatch]);

  return (
    <div className='nav__center--link is-flexed'>
      <label
        htmlFor='newpost'
        style={{ ...style }}
        className='nav__center--upload'
      >
        {children ? children : <FiCamera className='nav__center--upload' />}
        <input
          type='file'
          id='newpost'
          onChange={e => setFile(e.target.files[0])}
          accept='image/x-png,image/jpeg'
          ref={fileInputRef}
        />
      </label>
    </div>
  );
};

export default UploadButton;
