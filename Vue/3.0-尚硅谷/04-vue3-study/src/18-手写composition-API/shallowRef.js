// shallowRef 方法， 返回一个对象，
// 使用时 .value， 如果是对象的话，内部需要 reactive
function shallowRef(target) {
  return {
    _value: target,
    _is_ref: true,
    get value() {
      console.log('获取数据拦截！！');
      return this._value;
    },
    set value(val) {
      console.log('设置数据拦截！！');
      this._value = val;
    },
  };
};

// const state_1 = 15;
// const state_1_shallowRef = shallowRef(state_1);
// console.log(state_1_shallowRef.value);
// state_1_shallowRef.value += 1;

const user_5 = {
  name: 'ardor',
  age: 20,
  wife: {
    name: 'li',
    age: 18,
    child: {
      name: 'yong',
      age: 2,
      other: 'more'
    },
  },
  family: ['a', 'b']
};

const user_5_Reactive = shallowRef(user_5);
user_5_Reactive.value += 1;