// 类装饰器
/**
 * 类装饰器传递的参数为 类本身
 */
// 1. 普通装饰器（无法传参）
function logClass_1(target: any) {
  console.log(target);      // target 就是当前类

  target.prototype.apiUrl = '动态扩展的属性';
  target.prototype.run = function() {
    console.log(this.name);
  };
}

@logClass_1
class HttpClient_1 {
  name: string;
  constructor(name: string) {
    this.name = name;
  };

  getData() {
    
  }
};

const h_1: any = new HttpClient_1('arrow');
console.log(h_1.apiUrl);
h_1.run();

// 2. 装饰器工厂（可传参）
function logClass_2(params: string) {
  return function (target: any) {
    target.prototype.apiUrl = '动态扩展的属性' + params;
    target.prototype.run = function() {
      console.log(this.name + params);
    };
  }
}

@logClass_2('hello')
class HttpClient_2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  };

  getData() {
    
  }
};

const h_2: any = new HttpClient_2('arrow');
console.log(h_2.apiUrl);
h_2.run();

// 类的重载
function logClass_3(target: any) {
  return class extends target {
    name: string = '修改后！'
    more: number = 11111;
    getData() {
      console.log(this.name + this.more);
    }
  }
}

@logClass_3
class HttpClient_3 {
  name: string;
  constructor(name: string) {
    this.name = name;
  };

  getData() {
    console.log(this.name);
  }
};

const h_3 = new HttpClient_3('arrow-3');
h_3.getData()

export {}