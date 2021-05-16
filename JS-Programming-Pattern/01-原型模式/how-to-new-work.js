function Person(name) {
  this.name = name;
};

Person.prototype.getName = function() {
  return this.name;
};

const objectFactory = function() {
  const obj = new Object();   // 从 Object.prototype 上克隆一个空的对象
  const Constructor = Array.prototype.shift.call(arguments);    // 取得外部传入的构造器，此例是 Person
  obj.__proto__ = Constructor.prototype;    // obj 的 __proto__ 属性指向构造函数的原型（prototype），这样可以继承到原型链上的属性和方法
  const ret = Constructor.apply(obj, arguments);    //  构造函数执行，但是 this 的指向了 obj，这样 obj 就获取到了 实例属性 
  return typeof ret === 'object' ? ret : obj;
};

const a = objectFactory(Person, 'sven');
console.log(a);
console.log(a.name);
console.log(a.getName());

const b = new Person('ardor');
console.log(b);
console.log(b.name);
console.log(b.getName());