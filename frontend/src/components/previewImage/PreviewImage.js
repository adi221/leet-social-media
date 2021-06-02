import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

const PreviewImage = ({ onClick, image, likes, comments }) => {
  return (
    <figure onClick={onClick} key={image} className='preview-image'>
      <img src={image} alt='User post' />
      <div className='preview-image__overlay'>
        <span className='preview-image__content'>
          {likes > 0 && (
            <div className='preview-image__icon'>
              <FaHeart />
              <span>{likes}</span>
            </div>
          )}
          <div className='preview-image__icon'>
            <FaComment />
            <span>{comments}</span>
          </div>
        </span>
      </div>
    </figure>
  );
};

export default PreviewImage;
