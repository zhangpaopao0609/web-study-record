"use strict";
// 泛型约束
(() => {
    ;
    function genericExtends(val) {
        console.log(val.length);
    }
    ;
    genericExtends('qqweqe');
    // genericExtends<number>(123);
})();
