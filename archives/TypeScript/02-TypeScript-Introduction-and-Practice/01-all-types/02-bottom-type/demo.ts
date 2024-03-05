// 尾端类型
function throwError(): never {
  throw new Error();
};

function fail(): never {
  return throwError();
}

function infiniteLoop(): never {
  while (true) {
    console.log('endless...');
  }
}

type T = Exclude<boolean | number |string, number | string>;