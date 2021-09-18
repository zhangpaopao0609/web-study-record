// readonly 就是只能读取, 设置时提示错误, 并且是深度的

function readonly(target) {
  const readonlyHandler = {
    get(target, key) {
      if(key === '_is_readonly') return true;
      console.log("获取数据！！");
      return readonly(Reflect.get(target, key));
    },
    set() {
      throw new Error("This is readonly data!!Can not modify it!!");
    },
    deleteProperty() {
      throw new Error("This is readonly data!!Can not delete it!!");
    },
  };

  if(target && typeof target === 'object') {
    return new Proxy(target, readonlyHandler);
  }else {
    return target;
  };
};

const user_4 = {
  name: 'ardor',
  age: 20,
  wife: {
    name: 'li',
    age: 18,
    other: [1, 2],
  },
};

const user_4_Readonly = readonly(user_4);
// user_4_Readonly.name;

// user_4_Readonly.wife.other.push(3);
user_4_Readonly.wife.other[0] = 3;

// user_4_Readonly.wife.age += 1;
// console.log(user_4_Readonly.wife.age);

// user_4_Readonly.age += 1;