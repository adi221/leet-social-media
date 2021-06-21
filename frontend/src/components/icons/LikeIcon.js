import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeIcon = ({ isLiked, onClick, styleClass }) => {
  const redColorStyle = { fill: '#dd2f3e' };

  return isLiked ? (
    <FaHeart onClick={onClick} className={styleClass} style={redColorStyle} />
  ) : (
    <FaRegHeart onClick={onClick} className={styleClass} />
  );
};

export default LikeIcon;
