// shallowReactive 和 reactive

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


const user_2 = {
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

const user_2_Reactive = reactive(user_2);
user_2_Reactive.wife.child.age;
// 数据获取： wife {name: "li", age: 18, child: {…}}
// 数据获取： child {name: "yong", age: 2, other: "more"}
// 数据获取： age 2

user_2_Reactive.wife.child.age = 3;
// 数据获取： wife {name: "li", age: 18, child: {…}}
// 数据获取： child {name: "yong", age: 2, other: "more"}
// 数据设置： age true

delete user_2_Reactive.wife.child.other;
// 数据获取： wife {name: "li", age: 18, child: {…}}
// 数据获取： child {name: "yong", age: 3, other: "more"}
// 数据删除： other


user_2_Reactive.family[0];

