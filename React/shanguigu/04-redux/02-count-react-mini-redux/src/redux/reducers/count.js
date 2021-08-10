// 该文件是定义为 count 组件服务的 reducer
function countReducer(prevState=2, action) {
  console.log(prevState, action);
  const { type, data } = action;
  switch(type) {
    case 'increase':
      return prevState + data;
    case 'decrease':
      return prevState - data;
    default:
      return prevState;  
  };
};

export default countReducer;
