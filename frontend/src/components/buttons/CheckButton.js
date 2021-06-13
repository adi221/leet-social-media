import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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

CheckButton.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default CheckButton;
