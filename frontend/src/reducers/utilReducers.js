import { SHOW_MODAL, CLOSE_MODAL } from '../constants/utilConstants';

export const modalReducer = (
  state = { isShow: false, modalProps: {} },
  action
) => {
  switch (action.type) {
    case SHOW_MODAL:
      const { modalProps, modalType } = action.payload;
      return { isShow: true, modalType, modalProps };
    case CLOSE_MODAL:
      return { isShow: false };
    default:
      return state;
  }
};
