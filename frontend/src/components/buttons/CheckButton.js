import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { changePartnerUsersId } from '../../actions/chatActions';

const CheckButton = ({ userId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const checkButtonHandler = () => {
    if (isChecked) {
      dispatch(changePartnerUsersId(userId, 'del'));
    } else {
      dispatch(changePartnerUsersId(userId, 'add'));
    }
    setIsChecked(!isChecked);
  };

  return (
    <button
      className={`check-button is-flexed ${
        isChecked && 'check-button__checked'
      }`}
      onClick={checkButtonHandler}
    >
      {isChecked && <FaCheck />}
    </button>
  );
};

export default CheckButton;
