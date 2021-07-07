import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkTopScroll = () => {
      if (window.pageYOffset > 1400) {
        !showScroll && setShowScroll(true);
      } else {
        showScroll && setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkTopScroll);
    return () => {
      window.removeEventListener('scroll', checkTopScroll);
    };
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScroll) {
    return null;
  }

  return (
    <button className='scroll-top-btn' onClick={scrollTop}>
      <FaChevronUp />
    </button>
  );
};

export default ScrollTopButton;
