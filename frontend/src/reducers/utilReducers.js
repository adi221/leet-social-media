import { SHOW_MODAL, CLOSE_MODAL } from '../constants/utilConstants';

export const modalReducer = (state = { isShow: false }, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      const { isShow, modalType } = action.payload;
      return { isShow, modalType };
    case CLOSE_MODAL:
      return { isShow: false };
    default:
      return state;
  }
};
