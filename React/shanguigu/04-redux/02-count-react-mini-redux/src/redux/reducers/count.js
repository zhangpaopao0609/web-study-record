// 该文件是定义为 count 组件服务的 reducer
import { INCREASE, DECREASE } from "../constant";

function countReducer(prevState=2, action) {
  console.log(prevState, action);
  const { type, data } = action;
  switch(type) {
    case INCREASE:
      return prevState + data;
    case DECREASE:
      return prevState - data;
    default:
      return prevState;  
  };
};

export default countReducer;
