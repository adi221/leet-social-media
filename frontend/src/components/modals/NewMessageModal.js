import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { UsersList } from '../../components';
import { CLOSE_MODAL } from '../../constants/utilConstants';
import { RESET_CHAT_REDIRECT } from '../../constants/chatConstants';
import { createChat } from '../../actions/chatActions';

const NewMessageModal = props => {
  const dispatch = useDispatch();
  const { partnerUsersId, redirectChatId } = useSelector(
    state => state.createChat
  );
  const history = useHistory();

  useEffect(() => {
    if (redirectChatId) {
      history.push(`/direct/${redirectChatId}`);
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: RESET_CHAT_REDIRECT });
    }
  }, [redirectChatId, dispatch, history]);

  const createNewChatHandler = () => {
    dispatch(createChat());
  };

  return (
    <>
      <div className='modal__new-message--title'>
        <button onClick={() => dispatch({ type: CLOSE_MODAL })}>
          <GrClose />
        </button>
        <h3>New Message</h3>
        <button
          onClick={createNewChatHandler}
          className='modal__new-message--title-next'
          disabled={partnerUsersId && partnerUsersId.length === 0}
        >
          Next
        </button>
      </div>
      <UsersList {...props} />
    </>
  );
};

export default NewMessageModal;
