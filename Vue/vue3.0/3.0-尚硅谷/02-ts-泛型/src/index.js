"use strict";
// 泛型： 在定义函数、接口、类的时候不能预先确定要使用的数据的类型，而是在使用函数、接口、类的时候才能确定数据的类型
(() => {
    // 需求:定义一个函数，传入两个参数，第一个参数是数据，第二个参数是数量，函数的作用：根据数量产生对应个数的数据，存放在一个数组中
    // 定义一个函数
    function getArr(value, number) {
        return Array(number).fill(value);
    }
    ;
    const a1 = getArr(3, 1);
    console.log(a1[0].toFixed(2));
    const a2 = getArr('s2', 3);
    console.log(a2[0].split(''));
})();
// 多个泛型参数的函数
(() => {
    function getMessage(value1, value2) {
        return [value1, value2];
    }
    ;
    const arr2 = getMessage('11', 22);
    console.log(arr2);
})();
