// shallowReactive 和 reactive

function shallowReactive(target) {
  const shallowReactiveHandler = {
    get(target, key) {
      if(key === '_is_reactive') return true;
      const res = Reflect.get(target, key);
      console.log('数据获取：', key, res);
      return res;
    },
    set(target, key, newVal) {
      const res = Reflect.set(target, key, newVal);
      console.log('数据设置：', key, res);
      return res;
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      console.log('数据删除：', key);
      return res;
    },
  };
  if(target && typeof target === 'object') {
    return new Proxy(target, shallowReactiveHandler)
  }else {
    return target;
  }
};


const user_1 = {
  name: 'ardor',
  age: 20,
  wife: {
    name: 'li',
    age: 18,
  },
};

const user_1_ShallowReactive = shallowReactive(user_1);
user_1_ShallowReactive.name
// 数据获取： name ardor

user_1_ShallowReactive.name = 'arrow';
user_1_ShallowReactive.name
// 数据设置： name true
// 数据获取： name arrow

user_1_ShallowReactive.wife.name = 'wang';
user_1_ShallowReactive.wife.name
// 数据获取： wife {name: "li", age: 18}
// 数据获取： wife {name: "wang", age: 18}
// 深度时， shallow 时只有数据获取, 没有数据设置