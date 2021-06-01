// 泛型约束
(() => {
  interface HasLength {
    length: number
  };

  function genericExtends<T extends HasLength>(val: T): void{
    console.log(val.length);
  };

  genericExtends<string>('qqweqe');
  // genericExtends<number>(123);
})();