import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaComment } from 'react-icons/fa';

const PreviewImage = ({ onClick, image, likes, comments }) => {
  return (
    <figure onClick={onClick} key={image} className='preview-image'>
      <img src={image} alt='User post' />
      <div className='preview-image__overlay'>
        <span className='preview-image__content'>
          <div className='preview-image__icon'>
            <FaHeart />
            <span>{likes}</span>
          </div>

          <div className='preview-image__icon'>
            <FaComment />
            <span>{comments}</span>
          </div>
        </span>
      </div>
    </figure>
  );
};

PreviewImage.propTypes = {
  onClick: PropTypes.func,
  image: PropTypes.string.isRequired,
  likes: PropTypes.number,
  comments: PropTypes.number,
};

export default PreviewImage;
