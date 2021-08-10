// action 函数
export function increaseAction(data=0) {
  return {
    type: 'increase',
    data,
  };
};

export function decreaseAction(data=0) {
  return {
    type: 'decrease',
    data,
  };
};
