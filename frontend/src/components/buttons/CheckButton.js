import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

const CheckButton = ({ userId }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isChecked) return;
    // add to list of chat users
  }, [isChecked]);

  return (
    <button
      className={`check-button is-flexed ${
        isChecked && 'check-button__checked'
      }`}
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked && <FaCheck />}
    </button>
  );
};

export default CheckButton;
