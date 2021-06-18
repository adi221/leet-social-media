import {
  SHOW_MODAL,
  CLOSE_MODAL,
  SHOW_ALERT,
  CLOSE_ALERT,
} from '../constants/utilConstants';

export const closeModal = () => ({ type: CLOSE_MODAL });

export const openModal = (modalType, modalProps = {}) => ({
  type: SHOW_MODAL,
  payload: { modalType, modalProps },
});

export const closeAlert = () => ({ type: CLOSE_ALERT });

export const showAlert = text => dispatch => {
  dispatch({ type: SHOW_ALERT, payload: text });
  setTimeout(() => dispatch(closeAlert()), 2500);
};
