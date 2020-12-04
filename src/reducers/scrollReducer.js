import { actionTypes } from "../actions/actionTypes";

export const initialState = {
  hideOnScroll: null,
};

const scrollReducer = (state = initialState, action) => {
  console.log("💪Scroll Action💪 ", action);
  switch (action.type) {
    case actionTypes.SET_SCROLL:
      return {
        ...state,
        hideOnScroll: action.hideOnScroll,
      };
    default:
      return state;
  }
};

export default scrollReducer;
