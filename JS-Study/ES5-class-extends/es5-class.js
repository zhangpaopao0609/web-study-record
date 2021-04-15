// ES5 类
// 构造函数方式实现类
function Person(name, age) {
  // 实例属性，只能实例使用，构造函数获取不到
  this.name = name;
  this.age = age;   
  this.star = 'Earth'; // console.log(Person.star);  undefined

  // 实例方法，也只能实例使用
  this.init = function() {
    console.log(`${this.name} is fighting: ${this.age}!`);
  };
};
// 原型链属性，可被多个实例共享，比如原型链属性是引用值时，是共享的。也只能实例使用
Person.prototype.nationality = ['China'];   // console.log(Person.nationality); undefined
// 原型链方法
Person.prototype.home = function() {
  console.log(`${this.name}'s home is in ${this.star}`);
};

// 静态属性,实例无法获取, 只能构造函数本身使用
Person.universe = 'TheMilkyWay';    // console.log(arrow.universe); undefined
// 静态方法
Person.shuttle = function() {
  console.log('shuttling');
};

const arrow = new Person('Arrow', 12);
console.log('实例----------------------------');
console.log(arrow.name, arrow.age);     // Arrow 12 父类的实例属性
arrow.init();     // Arrow is fighting: 12! 父类的实例方法

console.log(arrow.nationality);    // [ 'China' ] 父类原型链属性
arrow.home();   // Arrow's home is in Earth 父类原型链方法

console.log(Person.universe);   // TheMilkyWay  构造函数静态属性
Person.shuttle();    // shuttling  构造函数静态方法

// Arrow 12
// Arrow is fighting: 12!
// Arrow's home is in Earth
// TheMilkyWay
// shuttling

const tom = new Person('Tom', 22);
console.log('\n原型链属性共享----------------------------');
console.log(tom.nationality);   // 父类原型链属性，引用类型
tom.nationality.push('French');    // 原型链上的属性是共享的
console.log(tom.nationality);  
console.log(arrow.nationality);

// [ 'China' ]
// [ 'China', 'French' ]
// [ 'China', 'French' ]