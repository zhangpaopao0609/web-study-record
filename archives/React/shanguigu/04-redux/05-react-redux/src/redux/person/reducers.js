// 该文件是定义为 count 组件服务的 reducer
import { ADDPERSON } from "../constant";

function personReducer(prevState=[], action) {
  const { type, data } = action;
  switch(type) {
    case ADDPERSON:
      return [data, ...prevState];
    default:
      return prevState;  
  };
};

export default personReducer;
