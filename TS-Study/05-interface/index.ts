/**
 * 1. 属性接口 对 json 的约束
 */

type FullName = {
  firstName: string;
  lastName: string;
  age?: number;
}

// interface FullName {
//   firstName: string;      // 这里用 ; 结尾哟
//   lastName: string;
// }

function printName(name: FullName): void {
  console.log(`${name.firstName}---${name.lastName}`);
};

const data: FullName = {
  firstName: 'arrow',
  lastName: 'bullet'
};

printName(data); 

/**
 * 2. 函数类型接口：对方法传入的参数 以及 返回值进行约束
 */
// 加密的函数类型接口
interface Encrypt {
  (key: string, value: string): string;
};

const md5: Encrypt = function(key: string, value: string): string {
  return key + value;
};

md5('11', '22'); 

/**
 * 3. 可索引接口： 数组、对象的约束（不常用）
 */

// 一般ts定义数组的方式是：
const arr1: number[] = [1, 2];
const arr2: Array<string> = ['1', '2'];

// 可索引接口  对数组的约束
interface SpecialArr {
  [index: number]: string;
};

const arr3: SpecialArr = ['a', 'b'];

// 可索引接口  对对象的约束
interface SpecialObj {
  [index:string]: string;
};

const obj1: SpecialObj = {
  test: 'test'
};

/**
 * 4. 类 类型接口: 对类的约束， 与抽象类有些类似
 */
interface Animal {
  name: string;
  eat(str: string): void;
};

class Dog implements Animal {   // 实现接口
  public name: string = 'init';
  constructor(name: string) {
    this.name = name;
  };

  eat(str: string) {
    console.log(this.name + '---' + str);
  };
};


const d = new Dog('wumi');
d.eat('meat');

/**
 * 5. 接口扩展，接口（类 类型）可以继承接口（类 类型）
 */

interface Person {
  star: string;
  getName(name: string): void;
};

interface Man extends Person {
  getGender(): void;
};

class Arrow implements Man {    // 实现接口
  star: string = 'Earth';

  getGender() {
    console.log('I am a man!!');
  };

  getName(name: string) {
    console.log(`my name is ${name}!!`);
  };
};

const a = new Arrow();
a.getGender();
a.getName('arrow');