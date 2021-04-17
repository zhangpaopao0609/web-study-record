// 这里的 T 就代表泛型
/**
 * 泛型函数
 */
function getData<T>(value: T): T {
  return value;
};

console.log(getData<number>(1)); 

console.log(getData<string>('arrow')); 

/**
 * 泛型类
 * 利用泛型来定义类
 */
class MinData<T> {
  public queue: T[] = [];
  public minData: T | undefined;

  add(data: T): void {
    if(!this.minData || this.minData > data) {
      this.minData = data;
    };
    this.queue.push(data);
  };

  min(): T | undefined {
    return this.minData;
  }
};

const n = new MinData<number>();
n.add(10);
n.add(4);
n.add(6);
console.log(n.min());

const s = new MinData<string>();
s.add('c');
s.add('a');
s.add('d');
console.log(s.min());

/**
 * 泛型接口
 * 1. 第一种
 */
interface fnType_1 {
  <T>(value: T): T;
};

const fn_1: fnType_1 = function<T>(value: T): T {
  return value;
};

console.log(fn_1<string>('1'));
console.log(fn_1<number>(1));

/**
 * 泛型接口
 * 2. 第二种
 */
interface fnType_2<T> {
  (value: T): T;
};

function fn<T>(value: T): T {
  return value;
};

const fn_2: fnType_2<string> = fn;

console.log(fn_2('1'));