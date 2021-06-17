import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { changePartnerUsersId } from '../../actions/chatActions';
import { changeSharePostReceivers } from '../../actions/postActions';

const CheckButton = ({ userId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const { modalType } = useSelector(state => state.modal);

  const actionsForEachModal = {
    SHARE_POST: changeSharePostReceivers,
    ADD_USER_GROUP: changePartnerUsersId,
    NEW_MESSAGE: changePartnerUsersId,
  };

  const checkButtonHandler = () => {
    const action = actionsForEachModal[modalType];
    if (isChecked) {
      dispatch(action(userId, 'del'));
    } else {
      dispatch(action(userId, 'add'));
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
