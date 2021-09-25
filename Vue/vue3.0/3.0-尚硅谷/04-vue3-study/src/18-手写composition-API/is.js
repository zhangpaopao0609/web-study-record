// 定义一个函数 isRef，判断当前的对象是不是 ref 对象
function isRef(target) {
  return target && target._is_ref;
};
// 定义一个函数 isReactive，判断当前的对象是不是 reactive 对象
function isReactive(target) {
  return target && target._is_reactive;
};
// 定义一个函数 isReadonly，判断当前的对象是不是 readonly 对象
function isReadonly(target) {
  return target && target._is_readonly;
};
// 定义一个函数 isProxy，判断当前的对象是不是 reactive 或者 redonly 对象
function isProxy(target) {
  return isReactive(target) || isReadonly(target);
};