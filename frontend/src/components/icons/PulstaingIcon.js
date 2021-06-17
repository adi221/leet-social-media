import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { animated, useSpring } from 'react-spring';

const PulsatingIcon = ({ elementRef, toggle }) => {
  const props = useSpring({
    from: { transform: toggle ? 'scale(1.3)' : 'scale(1)' },
    enter: { transform: 'scale(1)' },
    leave: { display: 'none' },
    config: {
      mass: 1,
      tension: 500,
      friction: 20,
    },
    // Prevent animating on initial render
    immediate: !elementRef.current,
  });

  return (
    <animated.div style={props}>
      <FaHeart className='red mr-sm single-icon' />
    </animated.div>
  );
};

export default PulsatingIcon;
