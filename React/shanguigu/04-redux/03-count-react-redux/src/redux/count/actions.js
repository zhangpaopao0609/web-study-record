import { INCREASE, DECREASE } from "../constant";

export const increaseAction = (data=0) => ({type: INCREASE, data});

export const decreaseAction = (data=0) => ({type: DECREASE, data});

export const increaseAsyncAction = (data=0, delay=500) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increaseAction(data));
    }, delay);
  };
};
