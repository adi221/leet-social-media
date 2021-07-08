import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/utilActions';

/**
 * Functional react component to approve user to delete his specific message from chat
 * @function UnsendMessageModal
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */

const UnsendMessageModal = props => {
  const { unsendMessage } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className='modal__unsend-message'>
        <h3>Unsend Message</h3>
        <p>
          Unsending will remove the message for everyone. People may have seen
          it already.
        </p>
      </div>
      <ul>
        <li>
          <button className='red bold' onClick={unsendMessage}>
            Unsend
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(closeModal())}> Cancel</button>
        </li>
      </ul>
    </>
  );
};

UnsendMessageModal.propTypes = {
  unsendMessage: PropTypes.func.isRequired,
};

export default UnsendMessageModal;
