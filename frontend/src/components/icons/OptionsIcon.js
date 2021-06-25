import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const OptionsIcon = ({ onClick, styleClass }) => {
  return <BiDotsHorizontalRounded className={styleClass} onClick={onClick} />;
};

export default OptionsIcon;
