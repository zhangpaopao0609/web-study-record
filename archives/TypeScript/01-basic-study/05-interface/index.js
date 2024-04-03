'use strict';
/**
 * 1. 属性接口 对 json 的约束
 */
// interface FullName {
//   firstName: string;      // 这里用 ; 结尾哟
//   lastName: string;
// }
function printName(name) {
  console.log(`${name.firstName}---${name.lastName}`);
}
;
const data = {
  firstName: 'arrow',
  lastName: 'bullet',
};
printName(data);
;
const md5 = function (key, value) {
  return key + value;
};
md5('11', '22');
/**
 * 3. 可索引接口： 数组、对象的约束（不常用）
 */
// 一般ts定义数组的方式是：
const arr1 = [1, 2];
const arr2 = ['1', '2'];
;
const arr3 = ['a', 'b'];
;
const obj1 = {
  test: 'test',
};
;
const Dog = /** @class */ (function () {
  function Dog(name) {
    this.name = 'init';
    this.name = name;
  }
  ;
  Dog.prototype.eat = function (str) {
    console.log(`${this.name}---${str}`);
  };
  ;
  return Dog;
}());
;
const d = new Dog('wumi');
d.eat('meat');
;
;
const Arrow = /** @class */ (function () {
  function Arrow() {
    this.star = 'Earth';
  }
  Arrow.prototype.getGender = function () {
    console.log('I am a man!!');
  };
  ;
  Arrow.prototype.getName = function (name) {
    console.log(`my name is ${name}!!`);
  };
  ;
  return Arrow;
}());
;
const a = new Arrow();
a.getGender();
a.getName('arrow');
