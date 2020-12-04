import { actionTypes } from "./actionTypes";

export const setScroll = (result) => {
  return (dispatch, getState) =>
    dispatch({ type: actionTypes.SET_SCROLL, hideOnScroll: result });
};
