import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const { isShow, text } = useSelector(state => state.alert);

  return <div className={`alert ${isShow && 'alert__show'}`}>{text}</div>;
};

export default Alert;
