import React from 'react';

const Message = ({ type, text }) => {
  return <p className={`message ${type}`}>{text}</p>;
};

Message.defaultProps = {
  type: 'info',
};

export default Message;
