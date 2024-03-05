function identity<T>(arg: T): T {
  return arg;
};

const foo = identity<string>('foo');

const barr = identity(true);

function assign<T = boolean, U = T>(target: T, source: U): T & U {}


function assign1<T = boolean, U>(target: T, source: U): T & U {}

identity<Date>(new Date());

interface Point {
  x: number;
  y: number;
}

function identity2<T extends Point>(x: T): T {
  return x;
};

identity2({ x: 1, y: 2 });

function identity3<T extends number = 0 | 1>(x: T): T {
  return x;
};

identity3(4)



interface Point2 {
  x: number;
  y: number;
}

function identity4<T extends Point2>(x: T): T {
  return { x: 1, y: 1 };
};
