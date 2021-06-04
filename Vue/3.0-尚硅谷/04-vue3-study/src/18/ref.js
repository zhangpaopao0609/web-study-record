// ref 方法， 返回一个对象，
// 使用时 .value， 如果是对象的话，内部需要 reactive
function reactive(target) {
  const reactiveHandler = {
    get(target, key) {
      const res = Reflect.get(target, key);
      console.log('数据获取：', key, res);
      return reactive(res);
    },
    set(target, key, newVal) {
      const res = Reflect.set(target, key, newVal);
      console.log('数据设置：', key, res);
      return reactive(res);
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      console.log('数据删除：', key);
      return reactive(res);
    },
  };
  if(target && typeof target === 'object') {
    return new Proxy(target, reactiveHandler)
  }else {
    return target;
  }
};

function ref(target) {
  const copy = reactive(target);
  return {
    _value: copy,
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

// const state_2 = 15;
// const state_2_ref = ref(state_2);
// console.log(state_2_ref.value);
// state_2_ref.value += 1;

const user_6 = {
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

const user_6_Reactive = reactive(user_6);
user_6_Reactive.wife.child.age += 1;