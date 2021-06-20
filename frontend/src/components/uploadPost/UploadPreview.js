import React from 'react';

const UploadPreview = ({ previewImage }) => {
  return (
    <div className='modal__upload--preview'>
      <img src={URL.createObjectURL(previewImage)} alt='preview' />
    </div>
  );
};

export default UploadPreview;
