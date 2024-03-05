// 作为对选哪个的方法调用
const obj = {
  a: 1,
  getA() {
    console.log(this === obj);
    console.log(this.a);
  },
};

obj.getA();