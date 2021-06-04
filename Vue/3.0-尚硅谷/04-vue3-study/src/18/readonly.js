// shallowReadonly 就是只能读取, 设置时提示错误

function shallowReadonly(target) {
  const shallowReadonlyHandler = {
    get(target, key) {
      console.log("获取数据！！");
      return Reflect.get(target, key);
    },
    set() {
      throw new Error("This is shallowReadonly data!!Can not modify it!!");
    },
    deleteProperty() {
      throw new Error("This is shallowReadonly data!!Can not modify it!!");
    },
  };

  if(target && typeof target === 'object') {
    return new Proxy(target, shallowReadonlyHandler);
  }else {
    return target;
  };
};

const user_3 = {
  name: 'ardor',
  age: 20,
  wife: {
    name: 'li',
    age: 18,
  },
};

const user_3_shallowReadonly = shallowReadonly(user_3);
user_3_shallowReadonly.name;

user_3_shallowReadonly.wife.age += 1;
console.log(user_3_shallowReadonly.wife.age);

user_3_shallowReadonly.age += 1;