import { SHOW_MODAL, CLOSE_MODAL } from '../constants/utilConstants';

export const closeModal = () => ({ type: CLOSE_MODAL });

export const openModal = (modalType, modalProps = {}) => ({
  type: SHOW_MODAL,
  payload: { modalType, modalProps },
});
