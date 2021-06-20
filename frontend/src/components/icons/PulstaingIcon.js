import React, { useEffect, useRef } from 'react';
import mojs from '@mojs/core';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PulsatingIcon = ({ isLiked = true }) => {
  const iconRef = useRef();

  useEffect(() => {
    // Prevent multiple instansiations on hot reloads
    if (iconRef.current) return;

    // Assign a Shape animation to a ref
    iconRef.current = new mojs.Html({
      // el: '#like',
      parent: iconRef.current,
      duration: 600,
      scale: { 1.4: 1 },
      easing: mojs.easing.out,
    });
  }, []);

  const handleClick = () => {
    iconRef.current.play();
  };

  // return <FaHeart id='like' ref={iconRef} onClick={handleClick} />;

  return (
    <button ref={iconRef}>
      {isLiked ? (
        <FaHeart
          id='like'
          onClick={handleClick}
          className='single-icon mr-sm'
          style={{ fill: '#dd2f3e' }}
        />
      ) : (
        <FaRegHeart className='single-icon mr-sm' />
      )}
    </button>
  );
};

export default PulsatingIcon;
