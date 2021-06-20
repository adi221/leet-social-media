import React from 'react';
import { useSelector } from 'react-redux';

const UploadDetails = ({ description, changeDescription, image }) => {
  const { userInfo } = useSelector(state => state.userLogin);

  return (
    <div className='modal__upload--details'>
      <form className='modal__upload--details-desc'>
        <img
          className='modal__upload--details-desc-user'
          src={userInfo.profileImage}
          alt={userInfo.username}
        />
        <textarea
          className='modal__upload--details-desc-textarea'
          placeholder='Write a caption...'
          value={description}
          onChange={e => changeDescription(e.target.value)}
        />
        <img
          src={image}
          alt='file'
          className='modal__upload--details-desc-image'
        />
      </form>
    </div>
  );
};

export default UploadDetails;
