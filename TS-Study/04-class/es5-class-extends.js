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
// 原型链属性，可被多个实例共享, 也只能实例使用
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


// ES5 继承
// 1. 原型链继承，可以继承父类的实例属性和方法以及父类原型链上的属性和方法，但是子类在实例化时不能给父类的构造函数传参
function Man_1() {};
Man_1.prototype = new Person();

const bullet_1 = new Man_1();
console.log('bullet-1-----------------------------------------');
console.log(bullet_1.star);   // Earth 可以获取到父类的实例属性
console.log(bullet_1.nationality);   // [ 'China' ] 可以获取到父类原型链上的属性
bullet_1.init();    // undefined is fighting: undefined!  可以使用父类的实例方法，但是没有参数传递
bullet_1.home();    // undefined's home is in Earth  可以使用父类的原型链上的方法，但是没有参数传递
// Earth
// [ 'China' ]
// undefined is fighting: undefined!
// undefined's home is in Earth


// 2. 盗用构造函数(constructor stealing, 也称对象伪装或者经典继承)继承，子类可继承父类的实例属性和方法同时子类在实例化时可以给父类的构造函数传参，但是无法继承父类原型链上的属性和方法
function Man_2(...args) {
  Person.call(this, ...args)
};

const bullet_2 = new Man_2('bullet', 32);
console.log('\nbullet-2-----------------------------------------');
console.log(bullet_2.name, bullet_2.age, bullet_2.star);   // bullet 32 Earth 可以获取到父类的实例属性，并且可以传递参数
bullet_2.init();  // bullet is fighting: 32! 可以获取到父类的实例方法，并且可以传递参数

console.log(bullet_2.nationality);  // undefined 无法获取到父类原型链上的属性, 自然方法也获取不到

// bullet 32 Earth
// bullet is fighting: 32!
// undefined


// 3. 原型链 + 盗用构造函数 实现组合继承（也称伪经典继承）
// 原型链继承原型链上的属性和方法
// 盗用构造函数继承实例属性和参数的传递
function Man(...args) {
  Person.call(this, ...args)
};

Man.prototype = new Person();

const love = new Man('love', 18);
console.log('\nlove-----------------------------------------');
console.log(love.name, love.age, love.star);    // love 18 Earth 可获取到父类的实例属性以及参数传递
love.init();    // love is fighting: 18!  可获取父类的实例方法以及参数传递

console.log(love.nationality);    // [ 'China' ] 可获取到父类的原型链属性
love.home();    // love's home is in Earth  可获取到父类的原型链方法