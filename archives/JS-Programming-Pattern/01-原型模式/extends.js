// 简单的原型链继承
const A = function() {};
A.prototype = { name: 'ardor-zhang' };

const B = function() {};
B.prototype = new A();

const b = new B();
console.log(b.name);


//  盗用构造函数 + 原型链 实现继承
function Person(feature) {
  this.feature = feature;
};

Person.prototype.getFeature = function() {
  return this.feature;
};

function Man(...args) {
  Person.apply(this, args);
};

Man.prototype = new Person();
// Man.prototype = Person.prototype;

const ardor = new Man('ardor');

console.log(ardor);
console.log(ardor.feature);
console.log(ardor.getFeature());