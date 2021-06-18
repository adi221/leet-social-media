import {
  SHOW_MODAL,
  CLOSE_MODAL,
  SHOW_ALERT,
  CLOSE_ALERT,
} from '../constants/utilConstants';

export const modalReducer = (
  state = { isShow: false, modalProps: {}, modalType: '' },
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

export const alertReducer = (state = { isShow: false }, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { isShow: true, text: action.payload };
    case CLOSE_ALERT:
      return { isShow: false };
    default:
      return state;
  }
};
