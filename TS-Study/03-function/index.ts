function run1(): string {
  return 'run1'
};

// 定义方法参数
function getInfo(name: string, age: number): string {
  return `${name}-${age}`;
};

console.log(getInfo('arrow', 2));


// 可选参数
function optionParameters(name: string, age?: number): string {
  if(age) {
    return `姓名：${name}---年龄：${age}`;
  }else {
    return `姓名：${name}---年龄保密`;
  }
};

console.log(optionParameters('arrow'));


// 可选参数
function defaultParameters(name: string, age: number = 20): string {
  return `姓名：${name}---年龄：${age}`;
};

console.log(defaultParameters('arrow', 12));

// 剩余参数
function resetParameters(...res: Array<number>): number {
  return res.reduce((a, b) => a + b);
};

console.log(resetParameters(...[1, 2, 4, 5]));
console.log(resetParameters(1, 2, 4, 5));


// 函数重载
function functionReload(name: string): string;
function functionReload(age: number): number;
function functionReload(par: any): any {
  if(typeof par === 'string') {
    return `my name is ${par}`;
  }else {
    return `my age is ${par}`;
  }
};

console.log(functionReload(12));
console.log(functionReload('arrow'));